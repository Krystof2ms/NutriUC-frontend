import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Header } from '../../shared/components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Footer, Header, RouterOutlet],
  selector: 'app-public-layout',
  templateUrl: './public-layout.html',
})
export class PublicLayout { }
