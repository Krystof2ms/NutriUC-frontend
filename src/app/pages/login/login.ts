import { Component, computed, inject, signal } from '@angular/core';
import { form, validateStandardSchema, FormField, FormRoot } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { Header } from '@app/shared/components/header/header';
import { InputPassword } from '@app/shared/components/input-password/input-password';
import { loginSchema, type LoginSchema } from '@app/shared/schemas/user';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [Header, InputPassword, FormField, FormRoot, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  model = signal<LoginSchema>({ email: '', password: '' });
  loginForm = form(
    this.model,
    (schema) => {
      validateStandardSchema(schema, loginSchema);
    },
    {
      submission: {
        action: async (field) => {
          try {
            const success = await firstValueFrom(
              this.authService.login(this.model().email, this.model().password),
            );

            if (success) {
              this.error.set(false);
              this.router.navigate(['/dashboard']);
            } else {
              this.error.set(true);
            }
          } catch (error) {
            console.error(error);
          }
        },
      },
    },
  );

  error = signal(false);
  isSubmitDisabled = computed(() => this.loginForm().invalid() || this.loginForm().submitting());
  emailError = computed(() => this.loginForm.email().invalid() && this.loginForm.email().touched());
  passwordError = computed(
    () => this.loginForm.password().invalid() && this.loginForm.password().touched(),
  );
}
