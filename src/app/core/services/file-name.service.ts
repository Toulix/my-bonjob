
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FileNameService {

  constructor() { }

    //needs refactoring
    getFileNameWithoutExtension(file: File): string {
    const name = file.name;
    const lastDot =  name.lastIndexOf('.'); 
    const fileName = name.substring(0, lastDot);
    return fileName
    }

    getFileNameWithExtension(file: File): string {
      return file.name;
    }

    getFileNameWithExtensionFromUrl(url: string): string {
      return url.match(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/g)[0];
    }

    geFileNameWithoutExtensionFromUrl(url: string) {
      const fileNameWithExtension = this.getFileNameWithExtensionFromUrl(url);
      const lastDot =  fileNameWithExtension.lastIndexOf('.'); 
      const fileName = fileNameWithExtension.substring(0, lastDot);
      return fileName;
    }
 
}
