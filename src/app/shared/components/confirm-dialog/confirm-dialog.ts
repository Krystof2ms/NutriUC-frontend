import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly dialogId = input('confirm-dialog');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly okClass = input('bg-destructive text-destructive-foreground hover:bg-destructive/85');
  readonly busyText = input('Procesando…');
  readonly busy = input(false);
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open() {
    this.dialog().nativeElement.showModal();
  }

  close() {
    this.dialog().nativeElement.close();
  }

  confirm() {
    if (this.busy()) return;
    this.confirmed.emit();
  }

  cancel() {
    this.close();
    this.cancelled.emit();
  }
}
