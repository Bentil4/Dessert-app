import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-panel',
  imports: [CurrencyPipe],
  templateUrl: './cart-panel.html',
  styleUrl: './cart-panel.css',
})
export class CartPanel {
  cart = inject(CartService);
}
