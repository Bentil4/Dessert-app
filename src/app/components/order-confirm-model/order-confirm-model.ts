import { Component, computed, inject, output, input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICartItem } from '../../types/cart';

@Component({
  selector: 'app-order-confirm-model',
  imports: [CurrencyPipe],
  templateUrl: './order-confirm-model.html',
  styleUrl: './order-confirm-model.css',
})
export class OrderConfirmModel {
  public cartService = inject(CartService);
  public readonly close = output<void>();

  public readonly items = input.required<ICartItem[]>();
  public readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  public startNewOrder(): void {
    this.close.emit();
  }
}
