import { Component } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { utils } from 'src/shared/utils';

@Component({
  selector: 'app-sign-documents',
  templateUrl: './sign-documents.component.html',
  styleUrls: ['./sign-documents.component.scss'],
})
export class SignDocumentsComponent {
  fileToUpload: File | null = null;
  numberPagesArray: number[] = [];
  position: any;
  pageSelection: any;
  pageSelected: any;

  constructor(private fileService: FileService) {}

  handleFileInput(target: any) {
    if (target.files) {
      this.fileToUpload = target.files[0];
      this.fileService
        .getNumberPagesDocument(target.files[0])
        .subscribe((res) => {
          const array = new Array(res).fill(0).map((_, index) => index + 1);
          this.numberPagesArray = array;
        });
    }
  }

  signFile() {
    try {
      if (this.fileToUpload) {
        this.fileService
          .signDocument(this.fileToUpload,this.position,this.pageSelection,this.pageSelected)
          .subscribe({
            next: (res) => {
              if (res) {
                utils.downloadFile(res, 'signDocument.pdf');
              }
            },
            error: (err) => {
              console.error(err);
            },
          });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
