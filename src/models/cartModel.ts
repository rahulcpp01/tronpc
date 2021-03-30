import { ProductModel } from './ProductModel';
export interface CartModel {
    count: number;
    productData: TronPCProduct[];
}


export interface TronPCProduct{
    id?: number;
    type?: string;
    in_cart?: number;
}