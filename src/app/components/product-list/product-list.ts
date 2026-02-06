import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductCard } from '../product-card/product-card';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../types/product';
@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard],
  templateUrl: './product-list.html',
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);

  products$ = this.productService.getProducts();

  public addToCart(product: IProduct): void {
    this.cartService.addItem(product);
  }

  public incrementQuantity(product: IProduct): void {
    this.cartService.increaseCartQuantity(product.name);
  }

  public decrementQuantity(product: IProduct): void {
    this.cartService.decreaseCartQuantity(product.name);
  }

  public getQuantity(product: IProduct): number {
    const item = this.cartService.items().find((item) => item.product.name === product.name);
    return item ? item.quantity : 0;
  }
}
