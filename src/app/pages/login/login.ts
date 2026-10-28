import { Component, computed, inject, signal } from '@angular/core';
import { form, validateStandardSchema, FormField, FormRoot } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { Header } from '@app/shared/components/header/header';
import { InputPassword } from '@app/shared/components/input-password/input-password';
import { Sonner } from '@app/shared/components/sonner/sonner';
import { loginSchema, type LoginSchema } from '@app/shared/schemas/user';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [Sonner, Header, InputPassword, FormField, FormRoot, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  protected readonly toast = toast;

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
            const response = await firstValueFrom(
              this.authService.login(this.model().email, this.model().password),
            );

            if (!response.success) throw new Error('login http error');

            this.toast.info('Bienvenido...');
            setTimeout(() => this.router.navigate(['/dashboard']), 2000);

            this.error.set(false);
          } catch (error) {
            console.error(error);

            this.toast.error('Error al acceder');

            this.error.set(true);
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
