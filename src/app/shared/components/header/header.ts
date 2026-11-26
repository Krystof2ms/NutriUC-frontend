import { ThemeSelector } from '@app/shared/components/theme-selector/theme-selector';
import { Component } from '@angular/core';
import { NavbarMain } from '../navbar-main/navbar';
import { MobileMenu } from '../mobile-menu/mobile-menu';

@Component({
  imports: [ThemeSelector, NavbarMain, MobileMenu],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {}
