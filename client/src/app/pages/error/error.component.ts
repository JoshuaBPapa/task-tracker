import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorCardComponent } from 'src/app/components/cards/error-card/error-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [SharedModule, ErrorCardComponent],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  message = 'There was an error while trying to load this page. ';

  constructor(private router: Router) {
    const currentNav = this.router.getCurrentNavigation();
    const lastSuccessfulNav = this.router.lastSuccessfulNavigation;

    if (currentNav && currentNav.extras.state) {
      this.message += currentNav.extras.state['message'];
    } else if (lastSuccessfulNav && lastSuccessfulNav.extras.state) {
      this.message += lastSuccessfulNav.extras.state['message'];
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
