import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../types/product';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add item to cart', () => {
    const cartService = TestBed.inject(CartService);
    spyOn(cartService, 'addItem');
    const product: IProduct = {
      name: 'Test Product',
      price: 10,
      category: 'Test',
      imageURL: { desktop: '', mobile: '', tablet: '', thumbnail: '' },
      id: '1'
    };
    component.addToCart(product);
    expect(cartService.addItem).toHaveBeenCalledWith(product);
  });
});
