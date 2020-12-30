import { ProductAttributes } from './product.attributes';
import { ProductCategories } from './product.categories';
import { ProductImage } from './product.image';
import { ProductMeta } from './product.meta';
import { ProductTag } from './product.tag';

export interface Product {
    id?: number;//	Unique identifier for the resource.READ-ONLY
    name?: string;//	Product name.
    slug?: string; //	Product slug.
    permalink?: string;//	Product URL.READ-ONLY
    date_created?: Date;	//The date the product was created, in the site's timezone.READ-ONLY
    date_created_gmt?: Date;	//The date the product was created, as GMT.READ-ONLY
    date_modified?: Date;	//The date the product was last modified, in the site's timezone.READ-ONLY
    date_modified_gmt?: Date	//The date the product was last modified, as GMT.READ-ONLY
    type?: string;	//Product type. Options: simple, grouped, external and variable. Default is simple.
    status?: string;//	Product status (post status). Options: draft, pending, private and publish. Default is publish.
    featured?: boolean;//	Featured product. Default is false.
    catalog_visibility?: string;	//Catalog visibility. Options: visible, catalog, search and hidden. Default is visible.
    description: string;	//Product description.
    short_description?: string;	//Product short description.
    sku?: string;	//Unique identifier.
    price?: string;	//Current product price.READ-ONLY
    regular_price?: string;	//Product regular price.
    sale_price?: string;	//Product sale price.
    date_on_sale_from?: Date;	//Start date of sale price, in the site's timezone.
    date_on_sale_from_gmt?: Date;	//Start date of sale price, as GMT.
    date_on_sale_to?: Date;	//End date of sale price, in the site's timezone.
    date_on_sale_to_gmt?: Date;	//End date of sale price, as GMT.
    price_html?: string; //	Price formatted in HTML.READ-ONLY
    on_sale?: boolean	//Shows if the product is on sale.READ-ONLY
    purchasable?: boolean;	///Shows if the product can be bought.READ-ONLY
    total_sales?: number	//Amount of sales.READ-ONLY
    virtual?: boolean;	//If the product is virtual. Default is false.
    downloadable?: boolean;//	If the product is downloadable. Default is false.
    //downloads	array	//List of downloadable files. See Product - Downloads properties
    download_limit?: number;//	Number of times downloadable files can be downloaded after purchase. Default is -1.
    download_expiry?: number;	//Number of days until access to downloadable files expires. Default is -1.
    external_url?: string;	//Product external URL. Only for external products.
    //button_text	string	//Product external button text. Only for external products.
    tax_status?: string;	//Tax status. Options: taxable, shipping and none. Default is taxable.
    tax_class?: string;//	Tax class.
    manage_stock?: boolean;//	Stock management at product level. Default is false.
    stock_quantity?: number;	//Stock quantity.
    stock_status?: string;	//Controls the stock status of the product. Options: instock, outofstock, onbackorder. Default is instock.
    backorders?: string;	//If managing stock, this controls if backorders are allowed. Options: no, notify and yes. Default is no.
    backorders_allowed?: boolean;//Shows if backorders are allowed.READ-ONLY
    backordered?: boolean;//	Shows if the product is on backordered.READ-ONLY
    sold_individually?: boolean;	//Allow one item to be bought in a single order. Default is false.
    weight?: string;//	Product weight.
    dimensions?: object//	Product dimensions. See Product - Dimensions properties
    shipping_required?: boolean;	//Shows if the product need to be shipped.READ-ONLY
    shipping_taxable?: boolean;	//Shows whether or not the product shipping is taxable.READ-ONLY
    shipping_class?: string;	//Shipping class slug.
    shipping_class_id?: number;	//Shipping class ID.READ-ONLY
    reviews_allowed?: boolean;	//Allow reviews. Default is true.
    average_rating?: string;	//Reviews average rating.READ-ONLY
    rating_count?: number;	//Amount of reviews that the product have.READ-ONLY
    related_ids?: number[];	//List of related products IDs.READ-ONLY
    upsell_ids?: number[];	//List of up-sell products IDs.
    cross_sell_ids?: number[];	//List of cross-sell products IDs.
    parent_id?: number;//Product parent ID.
    purchase_note?: string;	//Optional note to send the customer after purchase.
    categories?: ProductCategories[];	//List of categories. See Product - Categories properties
    tags?: ProductTag[];//List of tags. See Product - Tags properties
    images?: ProductImage[];//List of images. See Product - Images properties
    attributes?: ProductAttributes[];	//List of attributes. See Product - Attributes properties
    default_attributes?: ProductAttributes[]; //	Defaults variation attributes. See Product - Default attributes properties
    variations?: number[];	//List of variations IDs.READ-ONLY
    grouped_products?: number[]; //	List of grouped products ID.
    menu_order?: number;	//Menu order, used to custom sort products.
    meta_data?: ProductMeta[];	//Meta data. See Product - Meta data properties
    in_cart?: number;
}