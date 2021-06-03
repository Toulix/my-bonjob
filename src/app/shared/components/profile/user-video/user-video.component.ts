import { FormBuilder, FormGroup } from '@angular/forms';
import { AttachementFileService } from './../../../../candidate/services/attachement-file.service';
import { Base64Service } from './../../../../core/services/base64.service';
import { FileNameService } from './../../../../core/services/file-name.service';
import { CandidateResponseData } from './../../../../core/models/candidate-response-data';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { UploadService } from 'src/app/candidate/services/upload.service';
import { User } from 'src/app/core/models/connected.user';

@Component({
  selector: 'user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.scss']
})
export class UserVideoComponent implements OnInit {

  @Input()
  candidate: CandidateResponseData;

  @Input()
  user: User;

  videoForm: FormGroup;

  isDeleteVideoIconShown: boolean = false;

  //will be binded to the image [src]
  candidateVideo: string | ArrayBuffer;

  videoFileToUpload: File;

  @ViewChild("fileVideoUpload", {static: false}) fileVideoUpload: ElementRef;
  @ViewChild("candidateVideo", {static: false}) candidateVideoRef: ElementRef;


  constructor(private fileNameService: FileNameService,
              private base64Service: Base64Service,
              private attachementFileService:AttachementFileService,
              private fb: FormBuilder,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.initVideoForm();
    //if we get a video from the server, show the delete icon
    if(this.candidate?.user.video) {
      this.isDeleteVideoIconShown = true;
    }
  }
  
  initVideoForm() {
    //we need the json from this form only only when subitting data
   return this.videoForm = this.fb.group({
     user : this.fb.group({
      video: this.fb.group({
        name: '',
        data: '',
        action: ''
      }),
     })
   })
  }

  onClickUploadVideo() {
    this.fileVideoUpload.nativeElement.click();
  }

  handleVideoInput(file: File) {
    this.videoFileToUpload = file;
    const fileNameWithExtension = this.fileNameService
                                  .getFileNameWithExtension(file);
    const fileNameWithoutExtension = this.fileNameService
                                  .getFileNameWithoutExtension(file);

    this.base64Service.getBase64(file)
                      .pipe(
                        take(1),
                        tap((base64) => {
                          console.log("Base 64", base64);
                          
                          if(!this.candidate?.user.video) {
                            this.candidateVideo = base64;
                          } else {
                            this.candidateVideoRef.nativeElement.src = base64;
                          }
                          
                          //store base 64 in the from object
                          this.attachementFileService
                              .setFileData(base64,this.videoForm,'user.video.data')

                            if(this.candidate.user.video) {
                              this.attachementFileService
                                  .setFileAction('UPDATE',this.videoForm,'user.video.action');
                              this.attachementFileService
                                  .setFileName(fileNameWithoutExtension, this.videoForm,'user.video.name');
                            } else {
                              this.attachementFileService
                                  .setFileName(fileNameWithoutExtension, this.videoForm, 'user.video.name');
                              this.attachementFileService
                                  .setFileAction('INSERT', this.videoForm, 'user.video.action')
                            }
                        }),
                        exhaustMap(() => {
                          return this.uploadService
                                     .update(this.user?.id,
                                             this.videoForm.value)
                        })
                      ).subscribe(
                        () => {
                          //Don't show the delete icon until the upload is sucessful
                          this.isDeleteVideoIconShown = true;

                         // this.videoFromBasicForm.setValue(uploadResult.user.video)
                          //set the video in the basic form to be 
                          //the new video url returned from the server
                        }
                      )
  }

  onDeleteVideo() {
    //UPDATE|REMOVE, with extension
      //INSERT Without extension
   const { data, 
        ...result
      } = this.videoForm.value.user.video;

    const videoFromWithoutData = Object
                                    .assign({},
                                       {user: 
                                          { video: 
                                            {...result,
                                              //this is a url, not a name
                                              name: this.candidate.user.video ?
                                                    this.fileNameService
                                                        .getFileNameWithExtensionFromUrl(this.candidate.user.video)
                                                        :
                                                    this.videoFileToUpload.name,
                                              action: 'REMOVE',
                                            }
                                          }
                                        });
  
  console.log("Video form Without Data to be deleted", videoFromWithoutData);
              
  this.uploadService.update(this.user?.id, videoFromWithoutData)
                    .subscribe(
                      (result) => {
                        if(this.candidate?.user.video) {
                          this.candidateVideoRef.nativeElement.src="";
                        } else {
                          this.candidateVideo = "";
                        }
                        //don't chow/ (hide) the X icon 
                        this.isDeleteVideoIconShown = false;
                        this.videoFileToUpload = null;
                      },
                      (error) => {
                        console.log(error);
                      }
                    )
  }

}
