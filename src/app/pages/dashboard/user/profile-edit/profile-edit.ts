import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, validateStandardSchema } from '@angular/forms/signals';
import { UserService } from '@app/services/user/user';
import { updateSchema, type UpdateSchema } from '@app/shared/schemas/user';
import { BaseUser, UserUpdate } from '@app/types/api';
import { LucideArrowLeft, LucideChevronDown, LucideChevronUp } from '@lucide/angular';
import { firstValueFrom } from 'rxjs';
import { UserIcon } from '@app/shared/components/user-icon/user-icon';
import { AuthService } from '@app/services/auth/auth';
import { toDefaultSignal } from '@app/shared/utils/to-default-signal';
import { ImageCropper } from '@app/shared/components/image-cropper/image-cropper';
import { ActivatedRoute, Router } from '@angular/router';
import { Sonner } from '@app/shared/components/sonner/sonner';
import { toast } from 'ngx-sonner';

type Form = UpdateSchema;

@Component({
  imports: [
    LucideChevronUp,
    LucideChevronDown,
    LucideArrowLeft,
    FormRoot,
    FormField,
    UserIcon,
    ImageCropper,
    Sonner,
  ],
  selector: 'app-profile-edit',
  styleUrl: './profile-edit.css',
  templateUrl: './profile-edit.html',
})
export class ProfileEdit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected readonly toast = toast;

  avatarBlob = signal<Blob | null>(null);

  imageUrl = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.imageUrl.set(URL.createObjectURL(file));
  }

  onCropped(blob: Blob): void {
    this.avatarBlob.set(blob);
    this.imageUrl.set(null);
  }

  onCropCancel() {
    this.imageUrl.set(null);
  }

  user = toDefaultSignal(this.authService.ensureCurrentUser(), EMPTY_USER);

  initialModel = {
    username: '',
    email: '',
    confirmPassword: '',
    newPassword: '',
  } satisfies Form;

  model = signal<Form>(this.initialModel);

  readonly changes = computed(() => {
    const current = this.model();
    const original = this.initialModel;

    return Object.fromEntries(
      Object.entries(current).filter(
        ([key, value]) => value !== original[key as keyof typeof original],
      ),
    );
  });

  updateForm = form(
    this.model,
    (schema) => {
      validateStandardSchema(schema, updateSchema);
    },
    {
      submission: {
        action: async (field) => {
          await this.submitProfile();
        },
      },
    },
  );

  usernameError = computed(() =>
    this.updateForm.username().invalid() && this.updateForm.username().touched()
      ? this.updateForm.username().errors()[0].message
      : undefined,
  );
  emailError = computed(() =>
    this.updateForm.email().invalid() && this.updateForm.email().touched()
      ? this.updateForm.email().errors()[0].message
      : undefined,
  );
  confirmPasswordError = computed(() =>
    this.updateForm.confirmPassword().invalid() && this.updateForm.confirmPassword().touched()
      ? this.updateForm.confirmPassword().errors()[0].message
      : undefined,
  );
  newPasswordError = computed(() =>
    this.updateForm.newPassword().invalid() && this.updateForm.newPassword().touched()
      ? this.updateForm.newPassword().errors()[0].message
      : undefined,
  );

  readonly hasChanges = computed(() => Object.keys(this.changes()).length > 0 || this.avatarBlob());

  passwordEdit = signal(false);

  togglePasswordEdit() {
    this.passwordEdit.set(!this.passwordEdit());

    if (!this.passwordEdit()) {
      this.updateForm.newPassword().reset('');
      this.updateForm.confirmPassword().reset('');
    }
  }

  private async submitProfile(): Promise<void> {
    const payload = this.changes();

    const update = {
      name: payload['username'],
      email: payload['email'],
      password: payload['confirmPassword'],
    } satisfies UserUpdate;

    const tasks: Promise<unknown>[] = [];

    if (Object.keys(payload).length > 0) {
      tasks.push(firstValueFrom(this.userService.updateData(update)));
    }

    const avatarBlob = this.avatarBlob();

    if (avatarBlob) {
      tasks.push(firstValueFrom(this.userService.updateAvatarBlob(avatarBlob)));
    }

    if (tasks.length === 0) return;

    try {
      const results = await Promise.allSettled(tasks);

      const hasErrors = results.some((result) => result.status === 'rejected');

      if (hasErrors) {
        this.toast.error('No se pudieron guardar todos los cambios');
        return;
      }

      this.authService.invalidateData();

      this.toast.success('Perfil actualizado correctamente');

      setTimeout(() => {
        void this.router.navigate(['..'], {
          relativeTo: this.route,
        });
      }, 1500);
    } catch {
      this.toast.error('Ocurrió un error al actualizar el perfil');
    }
  }
}

const EMPTY_USER = {
  public_id: '',
  name: '',
  email: '',
  created_at: '',
  has_image: false,
} satisfies BaseUser;
