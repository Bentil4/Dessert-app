import { inject, Injectable } from '@angular/core';
import { IProduct, IProductImages } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private loggingService = inject(LoggingService);

  public getProducts(): Observable<IProduct[]> {
    this.loggingService.logAction('Fetching products');
    return this.http
      .get<
        IProduct[]
      >('assets/data/data.json')
      .pipe(
        map((products) =>
          products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
          })),
        ),
      );
  }
}
