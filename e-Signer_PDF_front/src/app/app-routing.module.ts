import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeDocumentsComponent } from 'src/components/merge-documents/merge-documents.component';
import { SignDocumentsComponent } from 'src/components/sign-documents/sign-documents.component';
import { SplitDocumentsComponent } from 'src/components/split-documents/split-documents.component';
import { HomeComponent } from '../components/home/home.component';


const routes: Routes = [
  { path: 'merge', component: MergeDocumentsComponent },
  { path: 'split', component: SplitDocumentsComponent },
  { path: 'sign', component: SignDocumentsComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
