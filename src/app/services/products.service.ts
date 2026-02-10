import { inject, Injectable } from '@angular/core';
import { IProduct, IProductImages } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay, catchError, retry } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment.development';
export interface IProductWithCart extends IProduct {
  inCartQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private loggingService = inject(LoggingService);
  private baseUrl = environment.apiURL;
  private _error$ = new BehaviorSubject<string | null>(null);

  public error$ = this._error$.asObservable();

  private products$ = this.http.get<IProduct[]>(this.baseUrl).pipe(
    retry(2),
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
    tap((products) => {
      this._error$.next(null);
      this.loggingService.logAction('Products loaded', products.length.toString());
    }),
    catchError((error) => {
      const errorMsg = 'Failed to load products. Showing sample data.';
      this._error$.next(errorMsg);
      this.loggingService.logAction('Product load error', error.message);
      return of(this.getFallbackProducts());
    }),
    shareReplay(1),
  );

  private getFallbackProducts(): IProduct[] {
    return [
      {
        id: '1',
        name: 'Sample Dessert',
        category: 'Cake',
        price: 5.0,
        image: {
          thumbnail: './assets/images/image-cake-thumbnail.jpg',
          mobile: './assets/images/image-cake-mobile.jpg',
          tablet: './assets/images/image-cake-tablet.jpg',
          desktop: './assets/images/image-cake-desktop.jpg',
        },
      },
    ];
  }

  public getProducts(): Observable<IProduct[]> {
    return this.products$;
  }

  public getProductsParallel(): Observable<[IProduct[], any]> {
    return forkJoin([this.products$, this.http.get(this.baseUrl)]).pipe(
      tap(() => this.loggingService.logAction('Parallel data load complete')),
    );
  }

  public filterByCategory(category: string): Observable<IProduct[]> {
    return this.products$.pipe(
      map((products) => products.filter((product) => product.category === category)),
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
      map((products) => products.filter((product) => product.price >= min && product.price <= max)),
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
        products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
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
          filtered = filtered.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
        }
        if (category) {
          filtered = filtered.filter((product) => product.category === category);
        }
        return filtered;
      }),
      tap((filtered) =>
        this.loggingService.logAction('Filtered products', `${filtered.length} items`),
      ),
      catchError((error) => {
        this.loggingService.logAction('Filter error', error.message);
        return of([]);
      }),
    );
  }
}
