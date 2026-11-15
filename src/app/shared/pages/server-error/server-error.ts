import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideRefreshCw,
  LucideServerCrash,
} from '@lucide/angular';

@Component({
  selector: 'app-server-error',
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideRefreshCw,
    LucideServerCrash,
  ],
  templateUrl: './server-error.html',
})
export class ServerError {
  reload(): void {
    window.location.reload();
  }
}