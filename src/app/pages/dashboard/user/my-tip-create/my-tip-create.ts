import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '@app/config/api.config';
import { TipService } from '@app/services/tip/tip';
import { FormTip } from '@app/shared/components/form-tip/form-tip';
import { TipCreate } from '@api/index';
import { toast } from '@app/shared/components/sonner/sonner';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-tip-create',
  imports: [FormTip],
  templateUrl: './my-tip-create.html',
})
export class MyTipCreate {
  private http = inject(HttpClient);
  private tipService = inject(TipService);
  private router = inject(Router);
  private apiUrl = inject(API_URL);

  categories = toSignal(this.http.get<string[]>(`${this.apiUrl}/categories/names?only_type=tip`), { initialValue: [] });
  isLoading = signal(false);

  createTip(data: TipCreate) {
    this.isLoading.set(true);
    this.tipService.create(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          toast.success('Tip creado con éxito');
          this.router.navigate(['/dashboard/user/mis-tips']);
        } else {
          // Solución: (res.error as any) para evadir el UnknownApiError
          toast.error((res.error as any)?.message || 'Error al crear el tip');
        }
      },
      error: () => {
        this.isLoading.set(false);
        toast.error('Ocurrió un error inesperado al intentar conectarse al servidor.');
      }
    });
  }
}