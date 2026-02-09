import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductCard } from '../product-card/product-card';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../types/product';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);

  products$ = this.productService.getProducts();
  items$ = this.cartService.items$;

  public addToCart(product: IProduct): void {
    this.cartService.addItemToCart(product);
  }

  public incrementQuantity(product: IProduct): void {
    this.cartService.increaseCartQuantity(product.name);
  }

  public decrementQuantity(product: IProduct): void {
    this.cartService.decreaseCartQuantity(product.name);
  }

  public getQuantity$(productName: string): Observable<number> {
    return this.items$.pipe(
      map((items) => {
        const item = items.find((item) => item.product.name === productName);
        return item ? item.quantity : 0;
      })
    );
  }
}
