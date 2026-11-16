import { Component, computed, input, signal } from '@angular/core';
import { LucideUser } from '@lucide/angular';

const LIMITE_RESUMEN = 160;

@Component({
  imports: [LucideUser],
  selector: 'app-tip-card',
  templateUrl: './tip-card.html',
})
export class TipCard {
  id = input.required<number>();
  category = input.required<string>();
  title = input.required<string>();
  content = input.required<string>();
  ownerName = input.required<string>();
  createdAt = input.required<string>();

  expanded = signal(false);
  esLarga = computed(() => this.content().length > LIMITE_RESUMEN);
  fechaFormateada = computed(() =>
    new Date(this.createdAt()).toLocaleDateString('es-PE', { dateStyle: 'medium' }),
  );
}
