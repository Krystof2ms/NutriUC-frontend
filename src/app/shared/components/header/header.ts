import { ThemeSelector } from '@app/shared/components/theme-selector/theme-selector';
import { Component } from '@angular/core';
import { NavbarMain } from '../navbar-main/navbar';

@Component({
  imports: [ThemeSelector, NavbarMain],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {}
