import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmModel } from './order-confirm-model';

describe('OrderConfirmModel', () => {
  let component: OrderConfirmModel;
  let fixture: ComponentFixture<OrderConfirmModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderConfirmModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
