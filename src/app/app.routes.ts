import { Routes } from '@angular/router';
import { Dessert } from './pages/dessert/dessert';
import { ProductCard } from './components/product-card/product-card';

export const routes: Routes = [
  {
    path: '',
    component: Dessert,
    title: 'Dessert',
  },
  {
    path: 'Product-Card',
    component: ProductCard,
    title: 'P-card',
  },
];
