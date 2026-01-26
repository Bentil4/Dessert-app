import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm-model',
  imports: [],
  templateUrl: './order-confirm-model.html',
  styleUrl: './order-confirm-model.css',
})
export class OrderConfirmModel {
  cartService = inject(CartService);
  router = inject(Router)

  readonly item = computed(() => this.cartService.items());
  readonly total = computed(() => this.cartService.totalPrice());

  close():void{
    this.router.navigateByUrl('/');
  }

  startNewOrder(): void{
    this.cartService.clearCart
  }
}
