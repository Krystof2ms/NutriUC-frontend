import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar-main',
  templateUrl: './navbar.html',
})
export class NavbarMain {
  links = [
    { label: 'Inicio', href: '/' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Tips', href: '/tips' },
    { label: 'Login', href: '/login' },
    { label: 'Registro', href: '/register' },
  ];
}
