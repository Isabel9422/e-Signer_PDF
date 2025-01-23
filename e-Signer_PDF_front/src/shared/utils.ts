import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export class utils {
  public static showError(message: string, translateService: TranslateService, snackBar: MatSnackBar) {
    var closeErrorMessage: string = translateService.instant('button.close');
    snackBar.open(message, closeErrorMessage, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  public static downloadFile(file: any, nameFile: string) {
    if (file) {
      var downloadURL = window.URL.createObjectURL(file);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = nameFile;
      link.click();
    }
  }
}
