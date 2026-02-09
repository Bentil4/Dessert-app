import { Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-panel',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './cart-panel.html',
})
export class CartPanel {
  public cartService = inject(CartService);
  public items$ = this.cartService.items$;
  public totalPrice$ = this.cartService.totalPrice$;

  public readonly confirm = output<void>();

  public removeItem(name: string): void {
    this.cartService.removeCartItem(name);
  }

  public startNewOrder(): void {
    this.confirm.emit();
  }
}
