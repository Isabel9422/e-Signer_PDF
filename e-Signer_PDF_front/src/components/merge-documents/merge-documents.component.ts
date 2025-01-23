import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from 'src/services/file.service';
import { utils } from 'src/shared/utils';

@Component({
  selector: 'app-merge-documents',
  templateUrl: './merge-documents.component.html',
  styleUrls: ['./merge-documents.component.scss'],
})
export class MergeDocumentsComponent {
  filesToUpload: File[] | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private fileService: FileService
  ) {}

  handleFileInput(target: any) {
    if (target.files && target.files.length <= 5) {
      this.filesToUpload = Array.from(target.files);
    } else {
      utils.showError(
        'error.moreFilesThanExpected',
        this.translateService,
        this.snackBar
      );
      this.filesToUpload = null;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.filesToUpload) {
      moveItemInArray(
        this.filesToUpload,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteItem(file: File) {
    if (this.filesToUpload) {
      const index = this.filesToUpload?.indexOf(file);
      if (index !== -1) {
        this.filesToUpload?.splice(index, 1);
      }
    }
  }

  mergeFiles() {
    try {
      if (this.filesToUpload) {
        this.fileService.mergeDocuments(this.filesToUpload).subscribe({
          next: (res) => {
            if (res) {
              utils.downloadFile(res, 'mergeDocument.pdf');
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
