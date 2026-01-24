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
}
