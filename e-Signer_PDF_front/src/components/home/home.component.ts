import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly route = inject(Router);

  actionDocument(action: string) {
    switch (action) {
      case 'split':
        this.route.navigate(['/split']);
        break;
      case 'merge':
        this.route.navigate(['/merge']);
        break;
      case 'sign':
        this.route.navigate(['/sign']);
        break;
      default:
        break;
    }
  }
}
