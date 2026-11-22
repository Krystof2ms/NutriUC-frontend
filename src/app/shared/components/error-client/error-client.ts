import { Component, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-error-client',
  templateUrl: './error-client.html',
})
export class ErrorClient {
  href = input.required<string>();
  title = input('Error');
  relativeTo = input<ActivatedRoute | null>(null);
}
