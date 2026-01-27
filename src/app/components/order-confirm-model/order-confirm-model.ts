import { Component, computed, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-confirm-model',
  imports: [CurrencyPipe],
  templateUrl: './order-confirm-model.html',
  styleUrl: './order-confirm-model.css',
})
export class OrderConfirmModel {
  cartService = inject(CartService);

  readonly items = computed(() => this.cartService.items());
  readonly total = computed(() => this.cartService.totalPrice());
  readonly close = output<void>();

  startNewOrder(): void {
    this.cartService.clearCart();
    this.close.emit();
  }
}
