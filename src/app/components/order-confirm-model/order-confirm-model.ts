import { Component, computed, output, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ICartItem } from '../../types/cart';

@Component({
  selector: 'app-order-confirm-model',
  imports: [CurrencyPipe],
  templateUrl: './order-confirm-model.html',
  styles: '',
})
export class OrderConfirmModel {
  public readonly close = output<void>();

  public readonly items = input.required<ICartItem[]>();
  public readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  public startNewOrder(): void {
    this.close.emit();
  }
}
