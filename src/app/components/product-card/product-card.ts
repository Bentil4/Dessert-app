import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IProduct } from '../../types/product';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group block',
  },
})
export class ProductCard {
  private cart = inject(CartService);

  product = input.required<IProduct>();

  add(): void{
    this.cart.addItem(this.product())
  }
}
