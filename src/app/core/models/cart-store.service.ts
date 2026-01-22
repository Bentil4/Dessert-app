import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root',
})
class CartStoreService {

    data: IProduct[] = []
}
