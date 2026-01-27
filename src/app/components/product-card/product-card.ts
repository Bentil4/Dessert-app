import { ChangeDetectionStrategy, Component, inject, input, output, computed } from '@angular/core';
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
  readonly inCartQuantity = input<number>(0);
  readonly increment = output<string>();
  readonly decrement = output<string>();
  readonly add = output<IProduct>();
}
