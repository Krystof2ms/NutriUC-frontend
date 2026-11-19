import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description?: string;
  robots?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  canonical?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  locale?: string;
  meta?: Record<string, string>;
}


@Service()
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly additionalTags = new Set<string>();
  private readonly defaultTitle = 'Nutri UC';

  update(config: SeoConfig): void {
    this.title.setTitle(config.title || this.defaultTitle);
    this.meta.updateTag({ name: 'description', content: config.description || '' });
    this.meta.updateTag({ name: 'robots', content: config.robots || 'noindex, nofollow' });
    this.updateOpenGraph(config);
    this.updateTwitter(config);
    this.updateCanonical(config);
    this.updateAdditional(config);
  }

  private updateOpenGraph(config: SeoConfig): void {
    const values: Record<string, string | undefined> = {
      'og:title': config.title || this.defaultTitle,
      'og:description': config.description,
      'og:type': config.type || 'website',
      'og:url': config.canonical,
      'og:image': this.absoluteUrl(config.image),
      'og:image:alt': config.imageAlt,
      'og:locale': config.locale || 'es_PE',
    };
    this.setPropertyTags(values);
  }

  private updateTwitter(config: SeoConfig): void {
    const values: Record<string, string | undefined> = {
      'twitter:card': config.twitterCard || (config.image ? 'summary_large_image' : 'summary'),
      'twitter:title': config.title || this.defaultTitle,
      'twitter:description': config.description,
      'twitter:image': this.absoluteUrl(config.image),
      'twitter:image:alt': config.imageAlt,
    };
    for (const [name, content] of Object.entries(values)) {
      if (content) this.meta.updateTag({ name, content });
      else this.meta.removeTag(`name='${name}'`);
    }
  }

  private updateCanonical(config: SeoConfig): void {
    const robots = config.robots || 'noindex, nofollow';
    const indexable = !/(^|[,\s])noindex([,\s]|$)/i.test(robots);
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!indexable || !config.canonical) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', config.canonical);
  }

  private updateAdditional(config: SeoConfig): void {
    for (const key of this.additionalTags) this.meta.removeTag(`name='${key}'`);
    this.additionalTags.clear();
    for (const [name, content] of Object.entries(config.meta || {})) {
      this.meta.updateTag({ name, content });
      this.additionalTags.add(name);
    }
  }

  private setPropertyTags(values: Record<string, string | undefined>): void {
    for (const [property, content] of Object.entries(values)) {
      if (content) this.meta.updateTag({ property, content });
      else this.meta.removeTag(`property='${property}'`);
    }
  }

  private absoluteUrl(value?: string): string | undefined {
    if (!value) return undefined;
    try {
      const base = isPlatformBrowser(this.platformId)
        ? this.document.location?.origin || this.document.baseURI
        : this.document.baseURI;
      return new URL(value, base).toString();
    } catch {
      return value;
    }
  }
}
