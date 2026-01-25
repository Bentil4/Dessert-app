import { Routes } from '@angular/router';
// import { Dessert } from './pages/dessert/dessert';
import { ProductCard } from './components/product-card/product-card';
import { ProductList } from './components/product-list/product-list';
import { Dessert } from './pages/dessert/dessert';
export const routes: Routes = [
  // {
  //   path: '',
  //   component: Dessert,
  //   title: 'Dessert',
  // },
  // {
  //   path: 'Product-Card',
  //   component: ProductCard,
  //   title: 'P-card',
  // },
  // {
  //   path: 'Product-List',
  //   component: ProductList,
  //   title: 'Pro-list',
  // },

  {
    path: '',
    loadComponent: () => import('./pages/dessert/dessert').then((m) => m.Dessert),
  },
];
