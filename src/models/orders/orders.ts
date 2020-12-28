import { OrderBilling } from './order.billing'
import { ordercoupons } from './order.coupons'
import { OrderFee } from './order.fee'
import { OrderLine } from './order.line'
import { OrderMeta } from './order.meat'
import { OrderRefunds } from './order.refunds'
import { OrderShipping } from './order.shipping'
import { OrderShippingLines } from './order.shipping.lines'
import { OrderTax } from './order.tax'

export interface Order {
    id?: number;
    parent_id?: number;
    number?: string;
    order_key?: string;
    created_via?: string;
    version?: string
    status?: string;
    currency?: string;
    date_created?: Date;
    date_created_gmt?: Date;
    date_modified?: Date;
    date_modified_gmt?: Date;
    discount_total?: string;
    discount_tax?: string;
    shipping_total?: string;
    shipping_tax?: string;
    cart_tax?: string;
    total?: string;
    total_tax?: string;
    prices_include_tax?: boolean;
    customer_id?: number
    customer_ip_address?: string;
    customer_user_agent?: string;
    customer_note?: string;
    billing?: OrderBilling;
    shipping?: OrderShipping;
    payment_method?: string;
    payment_method_title?: string;
    transaction_id?: string;
    date_paid?: Date;
    date_paid_gmt?: Date;
    date_completed?: Date;
    date_completed_gmt?: Date;
    cart_hash?: string;
    meta_data?: OrderMeta;
    line_items?: OrderLine[];
    tax_lines?: OrderTax[];
    shipping_lines?: OrderShippingLines[];
    fee_lines?: OrderFee[];
    coupon_lines?: ordercoupons[];
    refunds?: OrderRefunds[];
    set_paid?: boolean;

}