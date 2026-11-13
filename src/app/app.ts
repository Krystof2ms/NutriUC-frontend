import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoNavigationService } from './services/seo/seo-navigation.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly seoNavigation = inject(SeoNavigationService);
}
