import { IProduct } from './product';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartSummary {
  items: ICartItem[];
  totalPrice: number;
  itemCount: number;
}