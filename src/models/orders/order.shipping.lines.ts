import { OrderMeta } from './order.meat'
import { OrderTax } from './order.tax'

export interface OrderShippingLines {
    id?: number;
    method_title?: string;
    method_id?: string;
    total?: string;
    total_tax?: string;
    taxes?: OrderTax[];
    meta_data?: OrderMeta[];
}