import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { toast } from 'ngx-sonner';
import { TipService } from '@app/services/tip/tip';
import { CategoryService } from '@app/services/category/category';
import { FormTip } from '@app/shared/components/form-tip/form-tip';
import { TipUpdate } from '@api/index';

@Component({
  selector: 'app-my-tip-edit',
  imports: [FormTip],
  templateUrl: './my-tip-edit.html',
})
export class MyTipEdit {
  private categoryService = inject(CategoryService);
  private tipService = inject(TipService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  categories = toSignal(
    this.categoryService.getNames('tip').pipe(catchError(() => of([] as string[]))),
    { initialValue: [] as string[] },
  );
  isLoading = signal(false);
  tipData = signal<TipUpdate | null>(null);

  constructor() {
    if (!Number.isInteger(this.id) || this.id <= 0) {
      toast.error('El tip solicitado no es válido');
      this.router.navigate(['/dashboard/user/mis-tips']);
      return;
    }

    this.tipService.getById(this.id).subscribe((res) => {
      if (res.success && res.data) {
        this.tipData.set({
          title: res.data.title,
          content: res.data.content,
          category: res.data.category,
        });
      } else {
        toast.error('No se pudo cargar el tip');
        this.router.navigate(['/dashboard/user/mis-tips']);
      }
    });
  }

  updateTip(data: TipUpdate) {
    this.isLoading.set(true);
    this.tipService.update(this.id, data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          toast.success('Tip actualizado con éxito');
          this.router.navigate(['/dashboard/user/mis-tips']);
        } else {
          const mensaje = (res.error as { message?: string } | undefined)?.message;
          toast.error(mensaje ?? 'Error al actualizar el tip');
        }
      },
      error: () => {
        this.isLoading.set(false);
        toast.error('Ocurrió un error inesperado al actualizar.');
      },
    });
  }
}
