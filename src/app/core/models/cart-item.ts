import { IProduct } from "./product";

export interface CartLine{
    product: IProduct;
    quantity: number;
}