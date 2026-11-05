import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from '@app/config/api.config';
import { TipService } from '@app/services/tip/tip';
import { FormTip } from '@app/shared/components/form-tip/form-tip';
import { TipUpdate } from '@api/index'; // Quitamos TipDTO del import
import { toast } from '@app/shared/components/sonner/sonner';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-tip-edit',
  imports: [FormTip],
  templateUrl: './my-tip-edit.html',
})
export class MyTipEdit {
  private http = inject(HttpClient);
  private tipService = inject(TipService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiUrl = inject(API_URL);

  categories = toSignal(this.http.get<string[]>(`${this.apiUrl}/categories/names?only_type=tip`), { initialValue: [] });
  isLoading = signal(false);
  tipData = signal<TipUpdate | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tipService.getById(id).subscribe(res => {
        if (res.success && res.data) {
          // Solución: casteamos a 'any' para extraer las propiedades sin problemas de importación
          const tip = res.data as any;
          this.tipData.set({
            title: tip.title,
            content: tip.content,
            category: tip.category
          });
        } else {
          toast.error('No se pudo cargar el tip');
          this.router.navigate(['/dashboard/user/mis-tips']);
        }
      });
    }
  }

  updateTip(data: TipUpdate) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading.set(true);
    this.tipService.update(id, data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          toast.success('Tip actualizado con éxito');
          this.router.navigate(['/dashboard/user/mis-tips']);
        } else {
          // Solución: (res.error as any) para evadir el UnknownApiError
          toast.error((res.error as any)?.message || 'Error al actualizar el tip');
        }
      },
      error: () => {
        this.isLoading.set(false);
        toast.error('Ocurrió un error inesperado al actualizar.');
      }
    });
  }
}