import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dessert } from './dessert';

describe('Dessert', () => {
  let component: Dessert;
  let fixture: ComponentFixture<Dessert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dessert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dessert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
