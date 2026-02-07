import { Component, inject, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-panel',
  imports: [CurrencyPipe],
  templateUrl: './cart-panel.html',
})
export class CartPanel {
  public cart = inject(CartService);

  public readonly confirm = output<void>();

  public startNewOrder(): void {
    this.confirm.emit();
  }
}
