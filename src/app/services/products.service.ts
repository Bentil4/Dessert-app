import { inject, Injectable } from '@angular/core';
import { IProduct, IProductImages } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { LoggingService } from './logging.service';



@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private loggingService = inject(LoggingService);
  private products$ = this.http.get<IProduct[]>('assets/data/data.json').pipe(
    tap(() => this.loggingService.logAction('Fetching products')),
    map((products) =>
      products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
      })),
    ),
    tap((products) => this.loggingService.logAction('Products loaded', products.length.toString())),
    shareReplay(1),
  );

  public getProducts(): Observable<IProduct[]> {
    return this.products$;
  }

  public getProductsParallel(): Observable<[IProduct[], any]> {
    return forkJoin([this.products$, this.http.get('assets/data/data.json')]).pipe(
      tap(() => this.loggingService.logAction('Parallel data load complete')),
    );
  }

  public filterByCategory(category: string): Observable<IProduct[]> {
    return this.products$.pipe(
      map((products) => products.filter((p) => p.category === category)),
      tap((filtered) =>
        this.loggingService.logAction(
          'Filtered by category',
          `${category}: ${filtered.length} items`,
        ),
      ),
    );
  }

  public filterByPriceRange(min: number, max: number): Observable<IProduct[]> {
    return this.products$.pipe(
      map((products) => products.filter((p) => p.price >= min && p.price <= max)),
      tap((filtered) =>
        this.loggingService.logAction(
          'Filtered by price',
          `${min}-${max}: ${filtered.length} items`,
        ),
      ),
    );
  }

  public searchByName(searchTerm: string): Observable<IProduct[]> {
    return this.products$.pipe(
      map((products) =>
        products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
      tap((filtered) =>
        this.loggingService.logAction(
          'Searched products',
          `"${searchTerm}": ${filtered.length} items`,
        ),
      ),
    );
  }

  public filterProducts(searchTerm: string, category: string): Observable<IProduct[]> {
    return this.products$.pipe(
      map((products) => {
        let filtered = products;
        if (searchTerm) {
          filtered = filtered.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        }
        if (category) {
          filtered = filtered.filter((p) => p.category === category);
        }
        return filtered;
      }),
      tap((filtered) =>
        this.loggingService.logAction('Filtered products', `${filtered.length} items`),
      ),
    );
  }
}
