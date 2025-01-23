import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  title = 'E-signerPDF';
  private readonly route = inject(Router);

  constructor(public translate: TranslateService) {
    translate.addLangs(['es', 'en']);
    var lang = localStorage.getItem('locale');
    if (lang) {
      translate.setDefaultLang(lang);
      translate.use(lang);
    } else {
      translate.setDefaultLang('es');
      translate.use('es');
      localStorage.setItem('locale', 'es');
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.translate.setDefaultLang(language);
    localStorage.setItem('locale', language);
  }

  goHome() {
    this.route.navigate(['/']);
  }
}
