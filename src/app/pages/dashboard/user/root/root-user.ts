import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardLink } from '@app/shared/components/card-link/card-link';
import {
  LucideLightbulb,
  LucideCirclePlus,
  LucideSparkles,
  LucideUtensilsCrossed,
  LucideUser,
  LucideArrowRight,
} from '@lucide/angular';

@Component({
  imports: [CardLink, LucideUser, LucideArrowRight, RouterLink],
  selector: 'app-root-user',
  templateUrl: './root-user.html',
})
export class RootUser {
  basePathname = '/dashboard/user';
  sections = [
    {
      title: 'Mis recetas',
      items: [
        {
          title: 'Ver mis recetas',
          desc: 'Revisa y edita las recetas que has creado.',
          icon: LucideUtensilsCrossed,
          to: `${this.basePathname}/mis-recetas`,
        },
        {
          title: 'Crear una receta',
          desc: 'Comparte una nueva receta saludable.',
          icon: LucideCirclePlus,
          to: `${this.basePathname}/mis-recetas/nueva`,
        },
      ],
    },
    {
      title: 'Mis tips',
      items: [
        {
          title: 'Ver mis tips',
          desc: 'Consulta los consejos que has publicado.',
          icon: LucideLightbulb,
          to: `${this.basePathname}/mis-tips`,
        },
        {
          title: 'Crear tip',
          desc: 'Aporta un consejo para la comunidad.',
          icon: LucideSparkles,
          to: `${this.basePathname}/mis-tips/nuevo`,
        },
      ],
    },
  ];
}
