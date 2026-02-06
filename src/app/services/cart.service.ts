import { Injectable, computed, signal } from '@angular/core';
import { IProduct } from '../types/product';
import { ICartItem } from '../types/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<ICartItem[]>([]);

  items = this._items.asReadonly();

  totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity * item.product.price, 0),
  );

  /**
   * Add a product to the cart. If the product already exists in the cart,
   * increment its quantity by 1. If not, add it with a quantity of 1.
   * @param product The product to add to the cart
   */
  addItem(product: IProduct): void {
    this._items.update((items) => {
      const exiting = items.find((item) => item.product.name === product.name);
      if (exiting) {
        return items.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  increaseCartQuantity(name: string): void {
    this._items.update((items) =>
      items.map((item) =>
        item.product.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decreaseCartQuantity(name: string): void {
    this._items.update((items) => {
      const item = items.find((item) => item.product.name === name);
      if (!item) {
        return items;
      }
      if (item.quantity <= 1) {
        return items.filter((item) => item.product.name !== name);
      }
      return items.map((item) =>
        item.product.name === name ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  }

  removeCartItem(name: string): void {
    this._items.update((items) => items.filter((item) => item.product.name !== name));
  }

  clearCart(): void {
    this._items.set([]);
  }
}
