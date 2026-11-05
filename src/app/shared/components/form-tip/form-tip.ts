import { Component, input, output, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipCreate, TipUpdate } from '@api/index';
import { updateTipDefaultSchema } from '@app/shared/schemas/tip';

@Component({
  selector: 'app-form-tip',
  imports: [ReactiveFormsModule],
  templateUrl: './form-tip.html',
})
export class FormTip implements OnInit {
  private fb = inject(FormBuilder);

  initialData = input<TipUpdate | null>(null);
  categories = input.required<string[]>();
  isLoading = input<boolean>(false);

  submitTip = output<TipCreate>();

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    category: ['', Validators.required],
  });

  ngOnInit() {
    if (this.initialData()) {
      this.form.patchValue(this.initialData()!);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const data = this.form.value as TipCreate;
    const validation = updateTipDefaultSchema.safeParse(data);

    if (!validation.success) {
      return; // Aquí podrías integrar lógica local para mostrar errores del Zod schema
    }

    this.submitTip.emit(data);
  }
}