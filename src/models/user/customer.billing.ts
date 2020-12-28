import { CustomerShipping } from './customer.shipping'

export interface CustomerBilling extends CustomerShipping {
    email?: string;	//Email address.
    phone?: string;	//Phone number.
}