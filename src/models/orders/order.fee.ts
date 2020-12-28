import { OrderMeta } from './order.meat'
import { OrderTax } from './order.tax'

export interface OrderFee {
    id: number;
    name?: string;
    tax_class?: string;
    tax_status: string;
    total?: string;
    total_tax?: string;
    taxes?: OrderTax[];
    meta_data: OrderMeta[];
}