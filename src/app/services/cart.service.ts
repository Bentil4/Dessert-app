import { Injectable, computed, signal, inject, effect } from '@angular/core';
import { IProduct } from '../types/product';
import { ICartItem } from '../types/cart';
import { StorageService } from './storage.service';
import { LoggingService } from './logging.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageService = inject(StorageService);
  private loggingService = inject(LoggingService);
  private _items = signal<ICartItem[]>(this.storageService.loadCart<ICartItem[]>() || []);

  constructor() {
    effect(() => {
      this.storageService.saveCart(this._items());
    });
  }

  items = this._items.asReadonly();

  totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity * item.product.price, 0),
  );

  
  addItemToCart(product: IProduct): void {
    this._items.update((items) => {
      const existing = items.find((item) => item.product.name === product.name);
      if (existing) {
        return items.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
    this.loggingService.logAction('Product added to cart', product.name);
  }

  increaseCartQuantity(name: string): void {
    this._items.update((items) => {
      const item = items.find((item) => item.product.name === name);
      if (!item) return items;
      return items.map((item) =>
        item.product.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
    this.loggingService.logAction('Cart quantity increased', name);
  }

  decreaseCartQuantity(name: string): void {
    this._items.update((items) => {
      const item = items.find((item) => item.product.name === name);
      if (!item) return items;
      if (item.quantity <= 1) {
        return items.filter((item) => item.product.name !== name);
      }
      return items.map((item) =>
        item.product.name === name ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
    this.loggingService.logAction('Cart quantity decreased', name);
  }

  removeCartItem(name: string): void {
    this._items.update((items) => items.filter((item) => item.product.name !== name));
    this.loggingService.logAction('Item removed from cart', name);
  }

  clearCart(): void {
    this._items.set([]);
    this.storageService.clearCart();
    this.loggingService.logAction('Cart cleared');
  }
}
