import { Component, signal } from '@angular/core';
import { ProductList } from '../../components/product-list/product-list';
import { CartPanel } from "../../components/cart-panel/cart-panel";
import { OrderConfirmModel } from '../../components/order-confirm-model/order-confirm-model';

@Component({
  selector: 'app-dessert',
  imports: [ProductList, CartPanel, OrderConfirmModel],
  templateUrl: './dessert.html',
  styleUrl: './dessert.css',
})
export class Dessert {
  isOrderConfirmed = signal(false);

  onConfirmOrder(): void {
    this.isOrderConfirmed.set(true);
  }

  onCloseModal(): void {
    this.isOrderConfirmed.set(false);
  }
}
