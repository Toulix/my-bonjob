import { FormArray, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProfilFormService {
  constructor(private fb: FormBuilder) {
  }
  //
  toProfilFormGroup() {
    return this.fb.group({
      user: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        profil: [''],
        description: '',
        video: [''],
        pjs: this.fb.array([]),
        galeries: this.fb.array([]),
        experiences: this.fb.array([
          // this.addExperienceGroup(),
          // this.addExperienceGroup(),
        ]),
        formations: this.fb.array([
          //  this.addFormationGroup()
        ]),
        languages: this.fb.array([
          // this.fb.group({
          //     id: null,
          //     name: ['', Validators.required],
          //     level: ''
          // })
        ]),
        others: this.fb.group({
          job_search: '',
          statut: '',
          mobility: null,
          sector: this.fb.array([])
        })
      })
    })
  }

  addExperienceGroup() {
    return this.fb.group({
      id: null,
      positionHeld: ['', Validators.required],
      durationPositionHeld: [''],
      business: ['', Validators.required],
      description: ['']
    })
  }

  addFormationGroup() {
    return this.fb.group({
      id: null,
      level: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addLanguageGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      level: ''
    })
  }


  experiencesArray(form: FormGroup) {
    return form.get('user.experiences') as FormArray;
  }

  formationsArray(form: FormGroup) {
    return form.get('user.formations') as FormArray;
  }

  languagesArray(form: FormGroup) {
    return form.get('user.languages') as FormArray;
  }
}

