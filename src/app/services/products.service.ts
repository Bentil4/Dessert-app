import { inject, Injectable } from '@angular/core';
import { IProduct } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  /**
   * Fetches the list of products from the JSON file.
   * @returns An observable array of products.
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<any[]>('./assets/data/data.json').pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          id: String(product.id),
          imageURL: product.image,
        })),
      ),
    );
  }
}
