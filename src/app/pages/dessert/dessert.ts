import { Component, signal, inject, computed } from '@angular/core';
import { ProductList } from '../../components/product-list/product-list';
import { CartPanel } from '../../components/cart-panel/cart-panel';
import { OrderConfirmModel } from '../../components/order-confirm-model/order-confirm-model';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../types/cart';

@Component({
  selector: 'app-dessert',
  imports: [ProductList, CartPanel, OrderConfirmModel],
  templateUrl: './dessert.html',
  styles: '',
})
export class Dessert {
  public isOrderConfirmed = signal(false);
  public cartService = inject(CartService);
  public confirmedOrder = signal<ICartItem[]>([]);

  public onConfirmOrder(): void {
    this.confirmedOrder.set([...this.cartService.items()]);
    this.isOrderConfirmed.set(true);
    this.cartService.clearCart();
  }

  public onCloseModal(): void {
    this.isOrderConfirmed.set(false);
  }
}
