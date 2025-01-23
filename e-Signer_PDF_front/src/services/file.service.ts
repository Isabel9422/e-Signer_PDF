import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environment';
import { utils } from 'src/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private url = environment.url + '/file';

  httpOptions = {
    responseType: 'blob' as 'json',
  };

  constructor(
    private http: HttpClient,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  splitDocument(file: File, startPage: number, endPage: number): Observable<Blob> {
    const url = `${this.url}/splitDocument`;
    var formData: any = new FormData();
    formData.append('file', file);
    formData.append('startPage', startPage);
    formData.append('endPage', endPage);
    return this.http.post<Blob>(url, formData, this.httpOptions).pipe(
      tap((res) => res),
      catchError(this.handleError<Blob>('splitDocument'))
    );
  }

  mergeDocuments(files: File[]): Observable<Blob> {
    const url = `${this.url}/mergeDocuments`;
    var formData: any = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    return this.http.post<Blob>(url, formData, this.httpOptions).pipe(
      tap((res) => res),
      catchError(this.handleError<Blob>('mergeDocuments'))
    );
  }

  signDocument(
    file: File,
    position: string,
    pageSelection: string,
    pageSelected?: any
  ): Observable<Blob> {
    const url = `${this.url}/signDocument`;
    var formData: any = new FormData();
    formData.append('file', file);
    formData.append('position', position);
    formData.append('pageSelection', pageSelection);
    if (pageSelected != null) formData.append('pageSelected', pageSelected);
    return this.http.post<Blob>(url, formData, this.httpOptions).pipe(
      tap((res) => res),
      catchError(this.handleError<Blob>('signDocument'))
    );
  }

  getNumberPagesDocument(file: File): Observable<Number> {
    let formData = new FormData();
    formData.append('file', file);
    const url = `${this.url}/getNumberPagesDocument`;
    return this.http.post<Number>(url, formData).pipe(
      tap((res) => res),
      catchError(this.handleError<Number>('getNumberPagesDocument'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      utils.showError(
        `${operation} failed: ${error.message}`,
        this.translateService,
        this.snackBar
      );

      return of(result as T);
    };
  }
}
