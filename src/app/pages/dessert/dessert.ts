import { Component, signal, inject, OnDestroy } from '@angular/core';
import { ProductList } from '../../components/product-list/product-list';
import { CartPanel } from '../../components/cart-panel/cart-panel';
import { OrderConfirmModel } from '../../components/order-confirm-model/order-confirm-model';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../types/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dessert',
  imports: [ProductList, CartPanel, OrderConfirmModel],
  templateUrl: './dessert.html',
})
export class Dessert implements OnDestroy {
  private destroy$ = new Subject<void>();
  public isOrderConfirmed = signal(false);
  public cartService = inject(CartService);
  public confirmedOrder = signal<ICartItem[]>([]);

  public onConfirmOrder(): void {
    this.cartService.items$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.confirmedOrder.set([...items]);
      this.isOrderConfirmed.set(true);
      this.cartService.clearCart();
    });
  }

  public onCloseModal(): void {
    this.isOrderConfirmed.set(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
