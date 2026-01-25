import { inject, Injectable } from '@angular/core';
import { IProduct } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class productsService {
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('./assets/data.data.json');
  }
}
