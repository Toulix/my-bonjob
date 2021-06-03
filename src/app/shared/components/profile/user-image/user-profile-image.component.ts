import { UploadService } from '../../../../candidate/services/upload.service';
import { AttachementFileService } from '../../../../candidate/services/attachement-file.service';
import { Base64Service } from '../../../../core/services/base64.service';
import { FileNameService } from '../../../../core/services/file-name.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/connected.user';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.scss']
})
export class UserProfileImageComponent implements OnInit {

  @Input() 
  user?:  User;
  
  userProfilForm: FormGroup;

  //will be binded to the image src in case the user will
  //upload new profile
  userProfile: string | ArrayBuffer = null;
  defaultUserProfil: string = "/assets/images/default_candidate_profil.png";

  userProfileToUpload: File;

  isDeleteProfilIconShown: boolean = false;

 
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("userProfile", {static: false}) userImageProfilRef: ElementRef;
  
  constructor(private fileNameService: FileNameService,
              private base64Service: Base64Service,
              private attachementFileService: AttachementFileService,
              private uploadService: UploadService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initUserProfilForm();
    if(this.user.imageUrl) {
      this.isDeleteProfilIconShown = true;
    }
  }

  initUserProfilForm() {
     //we need the json from this form only only when submitting data
   return this.userProfilForm = this.fb.group({
    user : this.fb.group({
     profile: this.fb.group({
       name: '',
       data: '',
       action: '',
     }),
    })
  })
}

onClickUploadProfile() {
  this.fileUpload.nativeElement.click();
}

  handleUserProfilInput(file: File) {
    this.userProfileToUpload = file;
    const fileNameWithoutExtension = this.fileNameService
                                          .getFileNameWithoutExtension(file);
    const fileNameWithExtension = this.fileNameService
                                          .getFileNameWithExtension(file);

    this.base64Service.getBase64(file)
                      .pipe(
                        take(1),
                        tap((base64) => {

                        this.userProfile = base64

                        this.attachementFileService
                            .setFileData(base64,this.userProfilForm,'user.profile.data')

                        if(this.user?.imageUrl) {
                          this.userImageProfilRef.nativeElement
                              .setAttribute('src', base64);
                    //needs refactoring, update should not contain extension
                          this.attachementFileService
                              .setFileName(fileNameWithoutExtension, 
                                          this.userProfilForm, 'user.profile.name');

                          this.attachementFileService
                              .setFileAction('UPDATE',
                                          this.userProfilForm, 'user.profile.action');
                          } else {
                          
                          this.attachementFileService
                             .setFileName(
                              fileNameWithoutExtension,
                              this.userProfilForm,
                              'user.profile.name');

                          this.attachementFileService
                             .setFileAction(
                              'INSERT', 
                              this.userProfilForm,
                              'user.profile.action');
                          }
                        }),
                          exhaustMap(() => {
                            return this.uploadService
                                       .update(
                                            this.user?.id,
                                            this.userProfilForm.value);
                            }),
                        ).subscribe(
                          (event) => {
                            //Don't show the delete icon until the upload is sucessful
                           this.isDeleteProfilIconShown = true;
                          },
                          (error) => console.log("error", error));
                    }

  onDeleteProfile() {
  //UPDATE|REMOVE, with extension
    const { data, 
            ...result
            } = this.userProfilForm.value.user.profile;

    const userProfilFormWithoutData = Object
                                        .assign({}, 
                                          {user: 
                                              { profile: 
                                                {...result,
                                                  name: this.user.imageName ? 
                                                        this.user.imageName: this.userProfileToUpload.name,
                                                  action: 'REMOVE',
                                                }
                                              }
                                            });

console.log("Profil form Without Data to be deleted", userProfilFormWithoutData);
        
this.uploadService.update(this.user?.id, userProfilFormWithoutData)
              .subscribe(
                (result) => {
                  //when the deletion is successful
                  //set the image src property back to the 
                  //default candidate profil
                  if(this.userImageProfilRef as ElementRef) {
                    this.userImageProfilRef.nativeElement
                        .setAttribute('src', this.defaultUserProfil);
                  } else {
                    this.userProfile = this.defaultUserProfil;
                  }
                  //don't chow/ (hide) the X icon 
                  this.isDeleteProfilIconShown = false;

                  this.userProfileToUpload = null;
                },
                (error) => {
                  console.log(error);
                }
              )
}

}
