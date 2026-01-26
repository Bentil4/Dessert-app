import { Injectable, computed, signal } from '@angular/core';
import { IProduct } from '../types/product';
import { ICartItem } from '../types/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<ICartItem[]>([]);

  items = this._items.asReadonly();

  // totalItems = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));

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

  /**
   * Increment the quantity of the product with the given name in the cart by 1.
   * @param name The name of the product to increment its quantity
   */
  increaseQuantity(name: string): void {
    this._items.update((items) =>
      items.map((item) =>
        item.product.name === name ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  /**
   * Decrement the quantity of the product with the given name in the cart by 1.
   * If the product's quantity is already 1, remove it from the cart.
   * @param name The name of the product to decrement its quantity
   */
  decreaseQuantity(name: string): void {
    this._items.update((items) => {
      const item = items.find((it) => it.product.name === name);
      if (!item) {
        return items;
      }
      if (item.quantity <= 1) {
        return items.filter((it) => it.product.name !== name);
      }
      return items.map((it) =>
        it.product.name === name ? { ...it, quantity: it.quantity - 1 } : it,
      );
    });
  }

  /**
   * Remove a product from the cart by its name.
   * @param name The name of the product to remove from the cart
   */
  removeItem(name: string): void {
    this._items.update((items) => items.filter((item) => item.product.name !== name));
  }

  /**
   * Clears the cart by removing all items from it.
   */
  clearCart(): void {
    this._items.set([]);
  }
}
