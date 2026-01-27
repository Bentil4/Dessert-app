import { Routes } from '@angular/router';
import { Dessert } from './pages/dessert/dessert';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { OrderConfirmModel } from './components/order-confirm-model/order-confirm-model';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dessert/dessert').then((m) => m.Dessert),
  },
  {
    path: 'confirm',
    component: OrderConfirmModel,
  },

  { path: '**', component: PageNotFound, title: '404' },
];
