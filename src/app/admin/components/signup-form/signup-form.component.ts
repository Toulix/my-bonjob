import { SignUpService } from './../../../core/services/sign-up.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/candidate/validators/confirmed.validators';
import { AuthService } from 'src/app/core/services/auth.service';
import { exhaustMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  error = null;
  isLoading: boolean = false;

  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private signUpService: SignUpService
  ) { }

  ngOnInit(): void {
    this.initInscriptionForm();
  }

  initInscriptionForm() {
    this.inscriptionForm = this.fb.group({
      user: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        company: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required,
        Validators.minLength(4)]],
        roles: 'ROLE_ADMIN',
        isAdmin: 1
      },
        {
          validator: ConfirmedValidator('password', 'confirmPassword')
        })
    })
  }

  get user() {
    return this.inscriptionForm.get('user');
  }

  get firstname() {
    return this.inscriptionForm.get('user.firstname');
  }

  get lastname() {
    return this.inscriptionForm.get('user.lastname');
  }

  get company() {
    return this.inscriptionForm.get('user.company');
  }

  get email() {
    return this.inscriptionForm.get('user.email');
  }

  get password() {
    return this.inscriptionForm.get('user.password');
  }

  get confirmPassword() {
    return this.inscriptionForm.get('user.confirmPassword')
  }

  onSignUp() {
    this.isLoading = true;
    //strip out the confirm password 
    const { confirmPassword, ...signUpForm } = this.inscriptionForm.value.user;
    //we will need the email and password for auto-login
    const { email, password } = signUpForm;

    const signUpData = Object.assign({}, { user: { ...signUpForm } });
    //
    const credentials = { email, password };

    console.log(signUpData);

    this.signUpService
      .create<any>(signUpData)
      .pipe(
        exhaustMap(() => {
          return this.auth.singIn(credentials)
        })
      )
      .subscribe(
        (response) => {
          this.isLoading = false;
          return this.router.navigate(['/admin'])

        },
        (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
          return this.router.navigate(['/admin/signup'])
        }
      )

  }
}
