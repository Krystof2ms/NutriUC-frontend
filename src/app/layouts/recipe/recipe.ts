import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeEventListener } from '@app/providers/event-listener';

@Component({
  imports: [RouterOutlet],
  selector: 'app-recipe-layout',
  template: '<router-outlet />'
})
export class RecipeLayout {
  private readonly _listener = inject(RecipeEventListener);
}
