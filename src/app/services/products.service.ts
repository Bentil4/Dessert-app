import { inject, Injectable } from '@angular/core';
import { IProduct } from '../types/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
class productsService {
  private http = inject(HttpClient);

  data: IProduct[] = [];

  getProducts() {
    return this.http.get<IProduct[]>('/assets/data/data.json');
  }
}
