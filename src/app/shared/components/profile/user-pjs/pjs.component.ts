import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';
import { User } from 'src/app/core/models/connected.user';
import { FileNameService } from 'src/app/core/services/file-name.service';

import { Base64Service } from '../../../../core/services/base64.service';
import { AttachementFileService } from '../../../../candidate/services/attachement-file.service';
import { UploadService } from '../../../../candidate/services/upload.service';


@Component({
  selector: 'app-pjs',
  templateUrl: './pjs.component.html',
  styleUrls: ['./pjs.component.scss']
})
export class PjsComponent implements OnInit, OnChanges {

  @Input('candidatefromparent') candidatefromparent?: CandidateResponseData;
  @Input() user?:  User;

  progress: number = 0;

  pjFrom: FormGroup;
  pjFile: File;

  pjs: { name: string, url?: string}[]

  @ViewChild("filePjUpload", {static: false}) candidatePjFormRef: ElementRef;


  constructor(private uploadService: UploadService,
              private attachementFileService: AttachementFileService,
              private fileNameService: FileNameService,
              private base64Service: Base64Service,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.initPJForm();
    

    console.log("Candidate From pjs component", this.candidatefromparent);
    console.log("User From pjs component", this.user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook.
    // Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
      if(changes['candidatefromparent']) {
        this.pjs = this.candidatefromparent?.user.pjs;
      }
  }

  onUploadPj() {
    this.candidatePjFormRef.nativeElement.click();
  }
  
  initPJForm() {
    return this.pjFrom = this.fb.group({
      user : this.fb.group({
       pjs: this.fb.group({
         name: '',
         data: '',
         action: ''
       }),
      })
    })
  }

  handlePjInput(file: File) {
    this.pjFile = file;
    const fileNameWithoutExtension = this.fileNameService
                                          .getFileNameWithoutExtension(file);
    const fileNameWithExtension = this.fileNameService
                                          .getFileNameWithExtension(file);
    

    this.base64Service.getBase64(file)
                      .pipe(
                        take(1),
                        tap((base64) => {
                       this.attachementFileService
                           .setFileData(base64,this.pjFrom,'user.pjs.data')

                       this.attachementFileService
                           .setFileName(fileNameWithoutExtension,
                                         this.pjFrom,
                                         'user.pjs.name');
                       this.attachementFileService
                           .setFileAction('INSERT', 
                                        this.pjFrom,
                                        'user.pjs.action');
                       this.pjs.push({ name: fileNameWithExtension, url: ''})

                        }),
                        exhaustMap(() => {
                        return this.uploadService
                                     .update(this.user?.id,
                                                      this.pjFrom.value);
                        }),
                        // map((event: HttpEvent<UploadResponseData>) => {
                        //   switch(event.type) {
                        //     case HttpEventType.UploadProgress:
                        //           this.progress = Math.round(event.loaded *100 / event.total);
                        //           break;
                        //     case HttpEventType.Response:
                        //       console.log("Event Body", event.body);
                        //         return event;
                        //   }
                        // })
                        ).subscribe((event) => {
                          
                        },(error) => console.log("error", error))
                    }

  onDeleteOnePj(pj: {name: string, url: string}) {
  console.log("Pj to be deleted", pj);
  
  const { data, ...result } = this.pjFrom.value.user.pjs;
                        
  const profilFormWithoutData = Object.assign({},
                                          {user: 
                                            { pjs: 
                                              {...result,
                                                name: pj.name,
                                                action: 'REMOVE',
                                              }
                                            }
                                          });
                        
   console.log("Profil form Withour Data to be deleted", profilFormWithoutData);
                                      
  this.uploadService.update(this.user?.id, profilFormWithoutData)
                    .subscribe(
                      (result) => {
                        
                      },
                      (error) => {
                        console.log(error);
                      },() => {
                        const newPjs = this.pjs
                                           .filter(onePj => onePj.name !== pj.name);
                          
                          console.log("newPjs", newPjs);
                          this.pjs = newPjs;
                      }
                      )          
                  }
                }
