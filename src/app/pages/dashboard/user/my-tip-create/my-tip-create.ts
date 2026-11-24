import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { toast } from 'ngx-sonner';
import { TipService } from '@app/services/tip/tip';
import { CategoryService } from '@app/services/category/category';
import { FormTip } from '@app/shared/components/form-tip/form-tip';
import { ConfirmDialog } from '@app/shared/components/confirm-dialog/confirm-dialog';
import { LucideArrowLeft } from '@lucide/angular';
import { TipCreate } from '@api/index';

@Component({
  selector: 'app-my-tip-create',
  imports: [FormTip, ConfirmDialog, LucideArrowLeft],
  templateUrl: './my-tip-create.html',
})
export class MyTipCreate {
  private categoryService = inject(CategoryService);
  private tipService = inject(TipService);
  private router = inject(Router);
  private readonly leaveDialog = viewChild.required(ConfirmDialog);

  categories = toSignal(
    this.categoryService.getNames('tip').pipe(catchError(() => of([] as string[]))),
    { initialValue: [] as string[] },
  );
  isLoading = signal(false);

  onCancel() {
    this.leaveDialog().open();
  }

  confirmLeave() {
    this.leaveDialog().close();
    void this.router.navigate(['/dashboard/user/mis-tips']);
  }

  createTip(data: TipCreate) {
    this.isLoading.set(true);
    this.tipService.create(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          toast.success('Tip creado con éxito');
          this.router.navigate(['/dashboard/user/mis-tips']);
        } else {
          const mensaje = (res.error as { message?: string } | undefined)?.message;
          toast.error(mensaje ?? 'Error al crear el tip');
        }
      },
      error: () => {
        this.isLoading.set(false);
        toast.error('Ocurrió un error inesperado al intentar conectarse al servidor.');
      },
    });
  }
}
