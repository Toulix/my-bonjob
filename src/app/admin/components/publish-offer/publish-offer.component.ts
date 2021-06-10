import { OfferService } from './../../services/offer.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { ExperienceLabel } from 'src/app/candidate/constants/year-of-experience';
import { YearOfExperience } from 'src/app/candidate/enums/year-of-experience';
import { FileNameService } from 'src/app/core/services/file-name.service';

import { AttachementFileService } from './../../../candidate/services/attachement-file.service';
import { Base64Service } from './../../../core/services/base64.service';

@Component({
  selector: 'publish-offer',
  templateUrl: './publish-offer.component.html',
  styleUrls: ['./publish-offer.component.scss']
})
export class PublishOfferComponent implements OnInit {

  publishOfferform: FormGroup;
  error = null;

  isloading = false;

  @ViewChild("offerImageInput", {static: false}) offerImageInputRef: ElementRef;
  @ViewChild("offerImageName", {static: false}) offerImageNameRef: ElementRef;


  contractTypes = ['', 'CDI','CDD'];
  formations = ['', 'BTS', 'Licence', 'Master'];
  hours = [null,1,2,3,4,5,6,7,8];

  minimumExperiences = [
    { value: YearOfExperience.NO,  label: ExperienceLabel.NO },
    { value: YearOfExperience.PLUS_ONE, label: ExperienceLabel.PLUS_ONE },
    { value: YearOfExperience.ONE_TO_TWO, label: ExperienceLabel.ONE_TO_TWO },
    { value: YearOfExperience.THREE_TO_FOUR, label: ExperienceLabel.THREE_TO_FOUR },
    { value: YearOfExperience.PLUS_FIVE, label: ExperienceLabel.PLUS_FIVE },
  ]

  languages = ['Anglais', 'Français'];


  constructor(private fb: FormBuilder,
              private offerService: OfferService,
              private fileNameService: FileNameService,
              private attachementFileService: AttachementFileService,
              private base64Service: Base64Service) { }

  ngOnInit(): void {
  this.initPublishOfferForm();
  }


  initPublishOfferForm() {
    this.publishOfferform = this.fb.group({
      title: ['', Validators.required],
      level: [''],
      experience: [''],
      location: [''],
      contrat: [''],
      hour: [''],
      salary: [''],
      language: [''],
      startDate: [null],
      description: [''],
      image: this.fb.group({
        name: '',
        data: ''
      }),

    })
  }

  createOffer() {
    const offer = { ...this.publishOfferform.value, 
                    hour: +this.publishOfferform.value.hour 
                  }
    this.isloading = true;
    
    this.offerService.create(offer)
                      .subscribe(
                        (result) => {
                          this.isloading = false;
                          console.log(result);

                        },
                          (error) => {
                            this.isloading = false;
                            this.error = error;
                          }                         
                      )
    
  }

  onClickUploadOfferImage() {
    this.offerImageInputRef.nativeElement.click();
  }


  handleOfferPhotoInput(file: File) {

    const fileNameWithoutExtension = this.fileNameService
                                          .getFileNameWithoutExtension(file);
    const fileNameWithExtension = this.fileNameService
                                          .getFileNameWithExtension(file);

    this.base64Service.getBase64(file)
                      .pipe(
                        take(1),
                        tap((base64) => {
                        this.offerImageNameRef.nativeElement.value = fileNameWithExtension;
                       
                        this.attachementFileService
                            .setFileData(base64,
                                         this.publishOfferform,
                                         'image.data')

                        this.attachementFileService
                            .setFileName(
                              fileNameWithoutExtension,
                              this.publishOfferform,
                              'image.name');
                            }),
                        
                        ).subscribe(
                          (event) => {

                          },
                          (error) => console.log("error", error));
                          }

}
