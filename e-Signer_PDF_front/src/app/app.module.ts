import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MergeDocumentsComponent } from 'src/components/merge-documents/merge-documents.component';
import { SignDocumentsComponent } from 'src/components/sign-documents/sign-documents.component';
import { SplitDocumentsComponent } from 'src/components/split-documents/split-documents.component';
import { SharedModule } from 'src/shared/shared/shared.module';
import { HomeComponent } from '../components/home/home.component';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MergeDocumentsComponent,
    SplitDocumentsComponent,
    SignDocumentsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCommonModule,
    SharedModule,
    ToolbarComponent,
    HttpClientModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
