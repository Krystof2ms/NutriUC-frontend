import { Component, computed, inject, input, signal } from '@angular/core';
import { API_URL } from '@app/config/api.config';

@Component({
  imports: [],
  selector: 'app-user-icon',
  templateUrl: './user-icon.html',
})
export class UserIcon {
  private readonly apiUrl = `${inject(API_URL)}/users`;

  readonly userId = input.required<string>();
  readonly name = input.required<string>();
  readonly className = input<string>('', { alias: "class" });
  readonly has_image = input<boolean>(false);

  readonly imageError = signal(false);

  readonly avatarUrl = computed(() => `${this.apiUrl}/${this.userId()}/avatar`);

  generateColor(name: string): string {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return `hsl(${hash % 360}, 70%, 50%)`;
  }
}
