import { UploadService } from './../../../../services/upload.service';
import { AttachementFileService } from './../../../../services/attachement-file.service';
import { Base64Service } from './../../../../../core/services/base64.service';
import { FileNameService } from 'src/app/core/services/file-name.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/connected.user';
import { CandidateResponseData } from 'src/app/core/models/candidate-response-data';

@Component({
  selector: 'candidate-photos-gallery',
  templateUrl: './photos-gallery.component.html',
  styleUrls: ['./photos-gallery.component.scss']
})
export class PhotosGalleryComponent implements OnInit, OnChanges{

  @Input()
  user?:  User;

  @Input('candidatefromparent')
  candidatefromparent?: CandidateResponseData;

  @ViewChild("galleryUpload", {static: false}) galleryUpload: ElementRef;
  galleryFrom: FormGroup;



  galleries: any[];
  
  constructor(private fb: FormBuilder,
              private fileNameService: FileNameService,
              private base64Service: Base64Service,
              private uploadService: UploadService,
              private attachementFileService: AttachementFileService) { }

  ngOnInit(): void {
    this.initGalleryForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook.
    // Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
      if(changes['candidatefromparent']) {
        this.galleries = this.candidatefromparent?.user.galeries;
      }
  }


 
  initGalleryForm() {
    return this.galleryFrom = this.fb.group({
      user : this.fb.group({
        galleries: this.fb.group({
         name: '',
         data: '',
         action: ''
       }),
      })
    })
  }

  handleGalleryInput(file: File) {
    const fileNameWithoutExtension = this.fileNameService
                                          .getFileNameWithoutExtension(file);
    const fileNameWithExtension = this.fileNameService
                                          .getFileNameWithExtension(file);


    this.base64Service.getBase64(file)
                      .pipe(
                        take(1),
                        tap((base64) => {
                      
                        this.attachementFileService
                            .setFileData(base64,this.galleryFrom,'user.galleries.data')

                        this.attachementFileService
                            .setFileName(
                              fileNameWithoutExtension,
                              this.galleryFrom,
                              'user.galleries.name');

                        this.attachementFileService
                            .setFileAction(
                              'INSERT', 
                              this.galleryFrom,
                              'user.galleries.action');

                        this.galleries.push({ name: fileNameWithExtension, url: base64});

                            }),
                          exhaustMap(() => {
                            return this.uploadService
                                       .update(
                                            this.user?.id,
                                            this.galleryFrom.value);
                            }),
                        ).subscribe(
                          (event) => {

                          },
                          (error) => console.log("error", error));
}
                

  onClickUploadGallery() {
    this.galleryUpload.nativeElement.click()
  }


  onDeleteOnePicture(gallery: { name: string, url: string}) {

    const { data, ...result } = this.galleryFrom.value.user.galleries;
                        
    const galleryFormWithoutData = Object.assign({},
                                            {user: 
                                              { galleries: 
                                                {...result,
                                                  name: gallery.name,
                                                  action: 'REMOVE',
                                                }
                                              }
                                            });
                          
    this.uploadService.update(this.user?.id, galleryFormWithoutData)
                      .subscribe(
                        (result) => {
                          
                        },
                        (error) => {
                          console.log(error);
                        },() => {
                          const newGalleries = this.galleries
                                             .filter(picture => picture.name !== gallery.name);
                            this.galleries = newGalleries;
                        }
                        )    
                    }
}



