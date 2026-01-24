import { Injectable, computed, inject, signal } from '@angular/core';
import { IProduct } from '../types/product';
import { Cart } from '../types/cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = signal<Cart>([]);

  items = this.cart.asReadonly();

  totalItems = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() =>
    this.cart().reduce((sum, item) => sum + item.quantity * item.product.price, 0),
  );

  /**
   * Add a product to the cart. If the product already exists in the cart,
   * increment its quantity by 1. If not, add it with a quantity of 1.
   * @param product The product to add to the cart
   */
  addItem(product: IProduct): void {
    this.cart.update((current) => {
      const exiting = current.find((item) => item.product.name === product.name);
      if (exiting) {
        return current.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }
}
