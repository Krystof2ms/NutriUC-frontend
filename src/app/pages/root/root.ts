import { Component } from '@angular/core';
import {
  LucideBookOpen,
  LucideDynamicIcon,
  LucideIcon,
  LucideLightbulb,
  LucideUtensilsCrossed,
} from '@lucide/angular';

type Feature = {
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
};

@Component({
  imports: [LucideDynamicIcon],
  selector: 'app-root',
  styleUrl: './root.css',
  templateUrl: './root.html',
})
export class Root {
  features: Feature[] = [
    {
      icon: LucideUtensilsCrossed,
      title: 'Recetas saludables',
      description:
        'Descubre recetas fáciles, económicas y nutritivas adaptadas a la vida universitaria.',
      color: 'bg-accent text-accent-foreground',
    },
    {
      icon: LucideBookOpen,
      title: 'Guía nutricional',
      description:
        'Accede a información confiable y consejos sobre alimentación saludable y sostenible.',
      color: 'bg-accent text-accent-foreground',
    },
    {
      icon: LucideLightbulb,
      title: 'Tips saludables',
      description: 'Recomendaciones rápidas para mejorar tus hábitos alimenticios día a día.',
      color: 'bg-secondary/10 text-secondary',
    },
  ];
  heroImage = '/hero-food.jpg';
}
