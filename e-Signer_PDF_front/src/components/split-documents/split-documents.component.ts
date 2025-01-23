import { Component } from '@angular/core';
import { FileService } from 'src/services/file.service';
import { utils } from 'src/shared/utils';

@Component({
  selector: 'app-split-documents',
  templateUrl: './split-documents.component.html',
  styleUrls: ['./split-documents.component.scss'],
})
export class SplitDocumentsComponent {
  fileToUpload: File | null = null;
  numberPagesArray: number[] = [];
  startPage: number = 1;
  endPage: number = 1;

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

  splitFile() {
    try {
      if (this.fileToUpload) {
        this.fileService
          .splitDocument(this.fileToUpload, this.startPage, this.endPage)
          .subscribe({
            next: (res) => {
              if (res) {
                utils.downloadFile(res, 'splitDocument.pdf');
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
