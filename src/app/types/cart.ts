import { IProduct } from './product';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export type Cart = ICartItem[];
