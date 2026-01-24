import { Component, computed, inject, input, output } from '@angular/core';
import { IProduct } from '../../types/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<IProduct>();
  add = output<IProduct>();

  private cartService = inject(CartService);
  isInCart = computed(() =>
    this.cartService.items().some((i) => i.product.name === this.product().name),
  );

  quantity = computed(
    () =>
      this.cartService.items().find((i) => i.product.name === this.product().name)?.quantity ?? 0,
  );

  addToCart() {
    this.cartService.addItem(this.product());
  }

  increase() {
    this.cartService.increaseQuantity(this.product().name);
  }

  decrease() {
    this.cartService.decreaseQuantity(this.product().name);
  }
}
