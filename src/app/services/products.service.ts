import { inject, Injectable } from '@angular/core';
import { IProduct, IProductImages } from '../types/product';
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
   * @returns An observable array of products, each with a string id, a string name, a string category, a number price, and an IProductImages object.
   */
  getProducts(): Observable<IProduct[]> {
    return this.http
      .get<
        { id: string; name: string; category: string; price: number; image: IProductImages }[]
      >('assets/data/data.json')
      .pipe(
        map((products) =>
          products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            imageURL: product.image,
          })),
        ),
      );
  }
}
