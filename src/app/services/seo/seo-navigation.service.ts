import { inject, Service } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoConfig, SeoService } from './seo.service';

@Service()
export class SeoNavigationService {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.applyRouteConfig();
    });
  }
  

  private applyRouteConfig(): void {
    const config: SeoConfig = {};
    let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    while (route) {
      Object.assign(config, route.data);
      route = route.firstChild;
    }
    if (!config.canonical && config.robots !== 'noindex, nofollow') {
      config.canonical = this.router.url.split(/[?#]/, 1)[0] || '/';
    }
    this.seo.update(config);
  }
}
