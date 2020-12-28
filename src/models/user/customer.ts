import { CustomerBilling } from './customer.billing'
import { CustomerMeta } from './customer.meta.data'
import { CustomerShipping } from './customer.shipping'

export class Customer {
    id?: number	//Unique identifier for the resource.READ-ONLY
    date_created?: Date	//date-time	//The date the customer was created, in the site's timezone.READ-ONLY
    date_created_gmt?: Date;	//date-time	//The date the customer was created, as GMT.READ-ONLY
    date_modified?: Date;	//date-time	//The date the customer was last modified, in the site's timezone.READ-ONLY
    date_modified_gmt?: Date;//	date-time	//The date the customer was last modified, as GMT.READ-ONLY
    email?: string;	//The email address for the customer.MANDATORY
    first_name?: string//	Customer first name.
    last_name?: string;	//Customer last name.
    role?: string;	//Customer role.READ-ONLY
    username?: string	//Customer login name.
    password?: string	//Customer password.WRITE-ONLY
    billing?: CustomerBilling;	//List of billing address data. See Customer - Billing properties
    shipping?: CustomerShipping;	//List of shipping address data. See Customer - Shipping properties
    is_paying_customer?: boolean;//	Is the customer a paying customer?READ-ONLY
    avatar_url?: string;	//Avatar URL.READ-ONLY
    meta_data?: CustomerMeta[];	//array	//Meta data. See Customer - Meta data properties
}