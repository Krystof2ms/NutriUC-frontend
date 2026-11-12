import { Component, input, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@app/config/api.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  categories_type = input.required<'recipe' | 'tip'>();
  href = input<string>('');
  placeholder = input<string>('Buscar receta por nombre...'); // BUG 2 CORREGIDO
  
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  categories = signal<string[]>([]);
  searchQuery = '';
  selectedCategory = '';

  ngOnInit() {
    this.http.get<string[]>(`${this.apiUrl}/categories/names?only_type=${this.categories_type()}`)
      .subscribe(cats => this.categories.set(cats));
    
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedCategory = params['category'] || '';
    });
  }

  onSearch() {
    const queryParams: any = {};
    if (this.searchQuery) queryParams.search = this.searchQuery;
    if (this.selectedCategory) queryParams.category = this.selectedCategory;
    
    queryParams.cursor = null;
    queryParams.dir = null;

    const path = this.href() || window.location.pathname;
    this.router.navigate([path], { queryParams, queryParamsHandling: 'merge' });
  }
}