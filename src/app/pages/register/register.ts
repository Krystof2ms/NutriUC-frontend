import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, validateStandardSchema } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@app/services/user/user';
import { AuthService } from '@app/services/auth/auth';
import { Header } from '@app/shared/components/header/header';
import { InputPassword } from '@app/shared/components/input-password/input-password';
import { Sonner } from '@app/shared/components/sonner/sonner';
import { registerSchema, type RegisterSchema } from '@app/shared/schemas/user';
import type {
  ErrorResponse,
  HTTPValidationError,
  ValidationErrorResponse,
} from '@app/types/api';
import { LucideCheck, LucideCircle } from '@lucide/angular';
import { toast } from 'ngx-sonner';
import { firstValueFrom } from 'rxjs';

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 20;

@Component({
  imports: [Sonner, Header, InputPassword, FormField, FormRoot, RouterLink, LucideCheck, LucideCircle],
  selector: 'app-register',
  templateUrl: './register.html',
})
export class Register {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  protected readonly toast = toast;

  model = signal<RegisterSchema>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  private readonly emailServerError = signal<string | null>(null);
  private readonly lastFailedEmail = signal<string | null>(null);

  registerForm = form(
    this.model,
    (schema) => {
      validateStandardSchema(schema, registerSchema);
    },
    {
      submission: {
        action: async () => {
          this.clearServerErrors();

          try {
            const { name, email, password } = this.model();
            const response = await firstValueFrom(
              this.userService.create({
                name: name.trim(),
                email,
                password,
              }),
            );

            if (!response.success) {
              this.handleApiError(response.error.code, response.error.body, email);
              return;
            }

            this.authService.invalidateData();
            this.toast.success('Cuenta creada. Ahora inicia sesión.');
            setTimeout(() => void this.router.navigate(['/login']), 2000);
          } catch (error) {
            console.error(error);
            this.toast.error('Ocurrió un error inesperado al crear la cuenta.');
          }
        },
      },
    },
  );

  passwordRequirements = computed(() => {
    const { password, confirmPassword } = this.model();
    return [
      {
        label: `Entre ${MIN_PASSWORD} y ${MAX_PASSWORD} caracteres`,
        cumple: password.length >= MIN_PASSWORD && password.length <= MAX_PASSWORD,
      },
      {
        label: 'Las dos contraseñas son iguales',
        cumple: password.length > 0 && password === confirmPassword,
      },
    ];
  });

  confirmPasswordError = computed(() => {
    const { password, confirmPassword } = this.model();
    return confirmPassword.length > 0 && password !== confirmPassword
      ? 'Las contraseñas no coinciden'
      : null;
  });

  isSubmitDisabled = computed(
    () => this.registerForm().invalid() || this.registerForm().submitting(),
  );

  nameError = computed(
    () => this.registerForm.name().invalid() && this.registerForm.name().touched(),
  );

  emailErrorMessage = computed(() => {
    const serverError = this.emailServerError();
    if (serverError && this.model().email === this.lastFailedEmail()) {
      return serverError;
    }

    if (this.registerForm.email().invalid() && this.registerForm.email().touched()) {
      return this.registerForm.email().errors()[0]?.message ?? null;
    }

    return null;
  });

  private clearServerErrors(): void {
    this.emailServerError.set(null);
    this.lastFailedEmail.set(null);
  }

  private handleApiError(statusCode: unknown, body: unknown, submittedEmail: string): void {
    if (statusCode === 409) {
      this.setDuplicateEmailError(submittedEmail);
      return;
    }

    if (this.isValidationErrorResponse(body)) {
      const emailItem = body.errors.find((item) => item.field === 'email');
      if (emailItem) {
        const message = this.isDuplicateEmailText(emailItem.message)
          ? 'Este correo electrónico ya está registrado'
          : emailItem.message;
        this.emailServerError.set(message);
        this.lastFailedEmail.set(submittedEmail);
        this.toast.error(message);
        return;
      }

      const firstError = body.errors[0]?.message ?? body.message;
      this.toast.error(firstError || 'Revisa los datos ingresados e inténtalo nuevamente.');
      return;
    }

    if (this.isHTTPValidationError(body) && Array.isArray(body.detail)) {
      const emailItem = body.detail.find((item) => item.loc.includes('email'));
      if (emailItem) {
        const message = this.isDuplicateEmailText(emailItem.msg)
          ? 'Este correo electrónico ya está registrado'
          : emailItem.msg;
        this.emailServerError.set(message);
        this.lastFailedEmail.set(submittedEmail);
        this.toast.error(message);
        return;
      }

      const firstDetail = body.detail[0]?.msg;
      this.toast.error(firstDetail || 'Revisa los datos ingresados e inténtalo nuevamente.');
      return;
    }

    if (this.isErrorResponse(body)) {
      if (this.isDuplicateEmailText(body.detail)) {
        this.setDuplicateEmailError(submittedEmail);
        return;
      }

      this.toast.error(body.detail || 'No se pudo crear la cuenta. Inténtalo nuevamente.');
      return;
    }

    this.toast.error('No se pudo crear la cuenta. Verifica tus datos e inténtalo nuevamente.');
  }

  private setDuplicateEmailError(email: string): void {
    const message = 'Este correo electrónico ya está registrado';
    this.emailServerError.set(message);
    this.lastFailedEmail.set(email);
    this.toast.error(message);
  }

  private isDuplicateEmailText(text: string): boolean {
    return /(email|correo).*(exist|registr|already|taken|duplicate|uso)|((exist|registr|already|taken|duplicate|uso).*(email|correo))/i.test(
      text,
    );
  }

  private isErrorResponse(body: unknown): body is ErrorResponse {
    return (
      typeof body === 'object' &&
      body !== null &&
      'detail' in body &&
      typeof (body as ErrorResponse).detail === 'string'
    );
  }

  private isValidationErrorResponse(body: unknown): body is ValidationErrorResponse {
    return (
      typeof body === 'object' &&
      body !== null &&
      'errors' in body &&
      Array.isArray((body as ValidationErrorResponse).errors)
    );
  }

  private isHTTPValidationError(body: unknown): body is HTTPValidationError {
    return (
      typeof body === 'object' &&
      body !== null &&
      'detail' in body &&
      Array.isArray((body as HTTPValidationError).detail)
    );
  }
}
