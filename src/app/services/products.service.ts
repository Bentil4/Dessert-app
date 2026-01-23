import { inject, Injectable } from '@angular/core';
import { IProduct } from '../types/product';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class productsService {
  private http = inject(HttpClient);

  private readonly prodducts$ = this.http.get<IProduct[]>('/assets/data/data.json').pipe(
    shareReplay(1),
    map((items) => items ?? []),
  );

  // data: IProduct[] = [];

  // getProducts() {
  //   return this.http.get<IProduct[]>('/assets/data/data.json');
  // }
}
