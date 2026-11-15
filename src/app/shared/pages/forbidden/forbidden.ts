import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideArrowUpRight,
  LucideShieldX,
} from '@lucide/angular';

@Component({
  selector: 'app-forbidden',
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideArrowUpRight,
    LucideShieldX,
  ],
  templateUrl: './forbidden.html',
})
export class Forbidden {}