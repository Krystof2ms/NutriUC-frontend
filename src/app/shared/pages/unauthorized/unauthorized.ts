import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight, LucideLogIn, LucideShieldAlert, LucideUserPlus } from '@lucide/angular';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, LucideArrowUpRight, LucideLogIn, LucideShieldAlert, LucideUserPlus],
  templateUrl: './unauthorized.html',
})
export class Unauthorized {}
