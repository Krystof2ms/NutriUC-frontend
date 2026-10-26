import { Component, computed, input, model, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  imports: [LucideEye, LucideEyeOff],
  selector: 'app-input-password',
  templateUrl: './input-password.html',
})
export class InputPassword implements FormValueControl<string> {
  value = model('');
  className = input('');
  placeholder = input('••••••••');
  required = input(false);
  id = input.required();

  showPassword = signal(false);
  type = computed(() => (this.showPassword() ? 'text' : 'password'));

  toggleShow() {
    this.showPassword.set(!this.showPassword());
  }
}
