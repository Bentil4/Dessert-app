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
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);

  products$ = this.productService.getProducts();

  addToCart(product: IProduct): void {
    this.cartService.addItem(product);
  }

  incrementQuantity(product: IProduct): void {
    this.cartService.increaseQuantity(product.name);
  }

  decrementQuantity(product: IProduct): void {
    this.cartService.decreaseQuantity(product.name);
  }

  getQuantity(product: IProduct): number {
    const item = this.cartService.items().find((item) => item.product.name === product.name);
    return item ? item.quantity : 0;
  }
}
