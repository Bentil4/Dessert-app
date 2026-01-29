import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IProduct } from '../../types/product';
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
  product = input.required<IProduct>();
  readonly inCartQuantity = input<number>(0);
  readonly increment = output<string>();
  readonly decrement = output<string>();
  readonly add = output<IProduct>();
}
