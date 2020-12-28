import { Product } from './product/product';
import { ProductModel } from './ProductModel';
export interface CartModel {
    count: number;
    productData: Product[];
}
