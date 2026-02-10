import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IProduct } from '../../types/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group block',
  },
})
export class ProductCard {
  public product = input.required<IProduct>();
  public readonly inCartQuantity = input<number>(0);
  public readonly increment = output<string>();
  public readonly decrement = output<string>();
  public readonly add = output<IProduct>();
}
