import { Injectable, inject } from '@angular/core';
import { IProduct } from '../types/product';
import { ICartItem } from '../types/cart';
import { StorageService } from './storage.service';
import { LoggingService } from './logging.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageService = inject(StorageService);
  private loggingService = inject(LoggingService);
  private _items$ = new BehaviorSubject<ICartItem[]>(this.storageService.loadCart<ICartItem[]>() || []);

  public items$: Observable<ICartItem[]> = this._items$.asObservable();

  public totalPrice$: Observable<number> = this._items$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity * item.product.price, 0))
  );

  addItemToCart(product: IProduct): void {
    const items = this._items$.value;
    const existing = items.find((item) => item.product.name === product.name);
    const updated = existing
      ? items.map((item) => item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { product, quantity: 1 }];
    this._items$.next(updated);
    this.storageService.saveCart(updated);
    this.loggingService.logAction('Product added to cart', product.name);
  }

  increaseCartQuantity(name: string): void {
    const items = this._items$.value;
    const item = items.find((item) => item.product.name === name);
    if (!item) return;
    const updated = items.map((item) => item.product.name === name ? { ...item, quantity: item.quantity + 1 } : item);
    this._items$.next(updated);
    this.storageService.saveCart(updated);
    this.loggingService.logAction('Cart quantity increased', name);
  }

  decreaseCartQuantity(name: string): void {
    const items = this._items$.value;
    const item = items.find((item) => item.product.name === name);
    if (!item) return;
    const updated = item.quantity <= 1
      ? items.filter((item) => item.product.name !== name)
      : items.map((item) => item.product.name === name ? { ...item, quantity: item.quantity - 1 } : item);
    this._items$.next(updated);
    this.storageService.saveCart(updated);
    this.loggingService.logAction('Cart quantity decreased', name);
  }

  removeCartItem(name: string): void {
    const updated = this._items$.value.filter((item) => item.product.name !== name);
    this._items$.next(updated);
    this.storageService.saveCart(updated);
    this.loggingService.logAction('Item removed from cart', name);
  }

  clearCart(): void {
    this._items$.next([]);
    this.storageService.clearCart();
    this.loggingService.logAction('Cart cleared');
  }
}
