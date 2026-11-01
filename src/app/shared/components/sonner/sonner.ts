import { Component } from '@angular/core';
import { NgxSonnerToaster, toast as ngxToast } from 'ngx-sonner';

@Component({
  imports: [NgxSonnerToaster],
  selector: 'app-sonner',
  templateUrl: './sonner.html',
})
export class Sonner {}
export const toast = ngxToast;