import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  readonly dialogId = input('confirm-dialog');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly okClass = input('');
  readonly busyText = input('Procesando…');
  readonly busy = input(false);
  readonly confirmed = output<void>();

  confirm() {
    if (this.busy()) return;
    this.confirmed.emit();
  }
}
