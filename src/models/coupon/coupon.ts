export interface Coupon {
    id: number;
    code?: string;
    amount?: string;
    date_created?: Date;
    date_created_gmt?: Date;
    date_modified?: Date;
    date_modified_gmt?: Date;
    discount_type?: string;
    description?: string;
    date_expires?: string;
    date_expires_gmt?: string;
    usage_count?: number;//	integer	Number of times the coupon has been used already.READ-ONLY
    individual_use?: boolean;//	If true, the coupon can only be used individually. Other applied coupons will be removed from the cart. Default is false.
    product_ids?: number[];//	List of product IDs the coupon can be used on.
    excluded_product_ids?: number[];//	array	List of product IDs the coupon cannot be used on.
    usage_limit?: number;	//How many times the coupon can be used in total.
    usage_limit_per_user?: number//	integer	How many times the coupon can be used per customer.
    limit_usage_to_x_items?: number//	integer	Max number of items in the cart the coupon can be applied to.
    free_shipping?: boolean	//If true and if the free shipping method requires a coupon, this coupon will enable free shipping. Default is false.
    product_categories?: number[]; //	List of category IDs the coupon applies to.
    excluded_product_categories?: number[]//	array	List of category IDs the coupon does not apply to.
    exclude_sale_items?: boolean;//	If true, this coupon will not be applied to items that have sale prices. Default is false.
    minimum_amount?: string;//	Minimum order amount that needs to be in the cart before coupon applies.
    maximum_amount?: string;//	Maximum order amount allowed when using the coupon.
    email_restrictions?: string[];	//array	List of email addresses that can use this coupon.
    //used_by	array	List of user IDs (or guest email addresses) that have used the coupon.READ-ONLY
    //meta_data	array	Meta data. See Coupon - Meta data properties
}