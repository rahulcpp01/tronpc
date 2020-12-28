import { OrderModel } from '../orderModel'
import { OrderTax } from './order.tax'

export interface OrderLine {
    id?: number;
    name: string;
    product_id: number;
    variation_id?: number;
    quantity?: number;
    tax_class?: string;
    subtotal?: string;
    subtotal_tax?: string;
    total?: string;
    total_tax?: string;
    taxes?: OrderTax[];
    meta_data?: OrderModel;
    sku?: string;
    price?: string;
}