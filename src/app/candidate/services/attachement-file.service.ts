import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class AttachementFileService {
  constructor() {}

  setFileName(fileName: string, form: FormGroup, path: string) {
    return form.get(path)
               .setValue(fileName);
  }

  setFileData(base64: string | ArrayBuffer, form: FormGroup, path: string) {
    return form.get(path)
               .setValue(base64);
  }

  setFileAction(action:string, form: FormGroup, path: string) {
    return form.get(path)
               .setValue(action);
  }
}