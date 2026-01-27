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
  // router = inject(Router)

  readonly items = computed(() => this.cartService.items());
  readonly total = computed(() => this.cartService.totalPrice());
  readonly close = output<void>();

  // close():void{
  //   this.router.navigateByUrl('/');
  // }

  startNewOrder(): void {
    this.cartService.clearCart();
    this.close.emit();
  }
}
