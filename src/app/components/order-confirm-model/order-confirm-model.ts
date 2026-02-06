import { Component, computed, inject, output, input } from '@angular/core';
import { CartService } from '../../services/cart.service';import { CurrencyPipe } from '@angular/common';
import { ICartItem } from '../../types/cart';

@Component({
  selector: 'app-order-confirm-model',
  imports: [CurrencyPipe],
  templateUrl: './order-confirm-model.html',
  styleUrl: './order-confirm-model.css',
})
export class OrderConfirmModel {
  cartService = inject(CartService);

  readonly items = input.required<ICartItem[]>();
  readonly total = computed(() => 
    this.items().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );
  readonly close = output<void>();

  startNewOrder(): void {
    this.close.emit();
  }
}
