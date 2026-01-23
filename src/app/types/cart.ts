import { IProduct } from "./product";

export interface ICartLine{
    product: IProduct;
    quantity: number;
}