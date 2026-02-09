import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductCard } from '../product-card/product-card';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../types/product';
import { map, Observable, Subject, switchMap, startWith, debounceTime, takeUntil, distinctUntilChanged, combineLatest } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard, FormsModule],
  templateUrl: './product-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnDestroy {
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  private destroy$ = new Subject<void>();

  private searchTerm$ = new Subject<string>();
  private categoryFilter$ = new Subject<string>();

  public searchQuery = '';
  public selectedCategory = '';

  public products$ = combineLatest([
    this.searchTerm$.pipe(startWith(''), debounceTime(300), distinctUntilChanged()),
    this.categoryFilter$.pipe(startWith(''), distinctUntilChanged())
  ]).pipe(
    switchMap(([search, category]) => this.productService.filterProducts(search, category)),
    takeUntil(this.destroy$)
  );

  public items$ = this.cartService.items$;

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
      }),
    );
  }

  public onSearchChange(search: string): void {
    this.searchTerm$.next(search);
  }

  public onCategoryChange(category: string): void {
    this.categoryFilter$.next(category);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
