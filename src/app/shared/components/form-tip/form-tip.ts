import { Component, input, output, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TipCreate, TipUpdate } from '@api/index';
import { dynamicEnum } from '@app/shared/schemas/tip';

type CampoTip = 'title' | 'content' | 'category';

@Component({
  selector: 'app-form-tip',
  imports: [ReactiveFormsModule],
  templateUrl: './form-tip.html',
})
export class FormTip implements OnInit {
  private fb = inject(FormBuilder);
  private location = inject(Location);

  initialData = input<TipUpdate | null>(null);
  categories = input.required<string[]>();
  isLoading = input<boolean>(false);

  submitTip = output<TipCreate>();

  form = this.fb.nonNullable.group({
    title: [''],
    content: [''],
    category: [''],
  });

  errores = signal<Partial<Record<CampoTip, string>>>({});

  ngOnInit() {
    const datos = this.initialData();
    if (datos) {
      this.form.patchValue({
        title: datos.title ?? '',
        content: datos.content ?? '',
        category: datos.category ?? '',
      });
    }
  }

  onSubmit() {
    this.errores.set({});

    const categorias = this.categories();
    if (categorias.length === 0) {
      this.errores.set({ category: 'No se pudieron cargar las categorías. Intenta de nuevo más tarde.' });
      return;
    }

    const datos = this.form.getRawValue();
    const resultado = dynamicEnum(categorias).safeParse(datos);

    if (!resultado.success) {
      const nuevosErrores: Partial<Record<CampoTip, string>> = {};
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0];
        if (campo === 'title' || campo === 'content' || campo === 'category') {
          nuevosErrores[campo] = issue.message;
        }
      }
      this.errores.set(nuevosErrores);
      return;
    }

    this.submitTip.emit(datos);
  }

  cancelar() {
    this.location.back();
  }
}
