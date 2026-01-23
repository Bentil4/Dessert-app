import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityControl } from './quantity-control';

describe('QuantityControl', () => {
  let component: QuantityControl;
  let fixture: ComponentFixture<QuantityControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantityControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
