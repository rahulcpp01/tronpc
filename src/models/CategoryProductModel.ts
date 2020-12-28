import { inherits } from 'util';
import { Product } from './product/product';
import { ProductModel } from './ProductModel'

export interface CategoryProductModel extends Product {
    dynamically_selected_product?: Product;
}