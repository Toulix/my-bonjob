import { FormArray, FormControl, FormGroup, FormGroupName, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SectorAttribute } from 'src/app/candidate/models/sector-attribute';
import { Sector } from 'src/app/candidate/enums/sector';

@Component({
  selector: 'sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  
  //this is the others subgroup 
  @Input() form: FormGroup;

  sectors : SectorAttribute[] = [
    { 
      value: Sector.RESTAURANT,
      isSelected: false,
      label: Sector.RESTAURANT,
      styleClass: 'btn-first'
    },
    { 
      value: Sector.TRADE,
      isSelected: false,
      label: Sector.TRADE,
      styleClass:'btn-second'
    },
    { 
      value: Sector.MEDICALHEALTH,
      isSelected: false,
      label: Sector.MEDICALHEALTH,
      styleClass: 'btn-third'
    },
    { 
      value: Sector.BUILDING,
      isSelected: false,
      label: Sector.BUILDING,
      styleClass: 'btn-fourth'
    },
    { 
      value: Sector.INDUSTRY,
      isSelected: false,
      label: Sector.INDUSTRY,
      styleClass: 'btn-fifth'
    },
    { 
      value: Sector.LOGISTICTRANSPORT,
      isSelected: false,
      label: Sector.LOGISTICTRANSPORT,
      styleClass: 'btn-sixth'
    },
  ]

  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  selectSector(selectedSector: SectorAttribute) {
    const sectorName = selectedSector.value;
    selectedSector.isSelected = !selectedSector.isSelected;

    //if the sector already exists in the formArray (we use the some function for that)
    // then filter all the opposite, then reset ,
    //else push
    const sectorsArray: string[] = this.sectorsArray.value;
    if(sectorsArray.some(s => s == sectorName)) {
     const filteredSector =  sectorsArray.filter(s => s != sectorName );
     return this.form.setControl('sector', this.fb.array(filteredSector || []));
    } else {
      const control = new FormControl(sectorName);
      return this.sectorsArray.push(control);
    }
  }

  get sectorsArray() {
    return this.form.get('sector') as FormArray
  }
}
