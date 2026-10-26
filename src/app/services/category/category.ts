import { API_URL } from '@app/config/api.config';
import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import type { CategoryType } from '@api/types/category';

@Service()
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(API_URL)}/categories`;

  getNames(type: CategoryType) {
    return this.http.get<string[]>(`${this.apiUrl}/names`, {
      params: {
        only_type: type,
      },
    });
  }
}
