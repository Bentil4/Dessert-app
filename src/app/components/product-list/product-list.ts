import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductCard } from '../product-card/product-card';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe,ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {
  private productService = inject(ProductsService);
  products$ = this.productService.getProducts();
}
