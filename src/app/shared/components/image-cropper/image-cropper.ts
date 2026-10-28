import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';

import CropperCanvas from '@cropper/element-canvas';
import CropperImage from '@cropper/element-image';
import CropperSelection from '@cropper/element-selection';
import CropperHandle from '@cropper/element-handle';

CropperCanvas.$define();
CropperImage.$define();
CropperHandle.$define();
CropperSelection.$define();

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-image-cropper',
  styleUrl: './image-cropper.css',
  templateUrl: './image-cropper.html',
})
export class ImageCropper {
  image = input.required<string>();
  aspectRatio = input<number | undefined>(undefined);

  cropped = output<Blob>();
  cancelled = output<void>();

  selection = viewChild<ElementRef>('selection');

  async crop(): Promise<void> {
    const selection = this.selection()
      ?.nativeElement as
      | (HTMLElement & {
          $toCanvas: () => Promise<HTMLCanvasElement>;
          $change: (...args: number[]) => unknown;
        })
      | undefined;

    if (!selection) return;

    try {
      const canvas = await selection.$toCanvas();

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error('No se pudo generar la imagen recortada.'));
        }, 'image/webp', 0.9);
      });

      this.cropped.emit(blob);
    } catch (error) {
      console.error('Error al recortar la imagen:', error);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
