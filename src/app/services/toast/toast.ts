import { Service } from '@angular/core';
import { toast, ExternalToast } from 'ngx-sonner';

type Options = ExternalToast;

@Service()
export class ToastService {
  success(message: string, options?: Options): void {
    toast.success(message, options);
  }

  error(message: string, options?: Options): void {
    toast.error(message, options);
  }

  info(message: string, options?: Options): void {
    toast.info(message, options);
  }

  warning(message: string, options?: Options): void {
    toast.warning(message, options);
  }

  loading(message: string, options?: Options): string | number {
    return toast.loading(message, options);
  }

  dismiss(id?: string | number): void {
    toast.dismiss(id);
  }
}
