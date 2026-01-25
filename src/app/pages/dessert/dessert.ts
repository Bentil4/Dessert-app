import { Component } from '@angular/core';
import { ProductList } from '../../components/product-list/product-list';
import { CartPanel } from "../../components/cart-panel/cart-panel";

@Component({
  selector: 'app-dessert',
  imports: [ProductList, CartPanel],
  templateUrl: './dessert.html',
  styleUrl: './dessert.css',
})
export class Dessert {

}
