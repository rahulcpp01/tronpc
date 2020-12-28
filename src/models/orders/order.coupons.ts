import { OrderMeta } from './order.meat'

export interface ordercoupons {
    id?: number;
    code?: string;
    discount?: string;
    discount_tax?: string;
    meta_data?: OrderMeta[];
    //meta_data	array	Meta:data
}