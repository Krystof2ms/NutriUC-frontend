import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '@app/services/user/user';
import { CardLink } from '@app/shared/components/card-link/card-link';
import { ErrorClient } from '@app/shared/components/error-client/error-client';
import {
  LucideCirclePlus,
  LucideLightbulb,
  LucideSparkles,
  LucideUtensilsCrossed,
} from '@lucide/angular';


@Component({
  imports: [ErrorClient, LucideUtensilsCrossed, LucideLightbulb, CardLink],
  selector: 'app-my-creations',
  styleUrl: './my-creations.css',
  templateUrl: './my-creations.html',
})
export class MyCreations {
  private userService = inject(UserService);

  stats = toSignal(this.userService.getStats());

  basePathname = '/dashboard/user';
  items = [
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
      to: `${this.basePathname}/mis-recetas/nuevo`,
    },
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
  ];
}
