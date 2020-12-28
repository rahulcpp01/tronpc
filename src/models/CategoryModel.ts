import { ProductCategoryImage } from './productcategory/productcategoryimage';

export interface CategoryModel {
    id: number;
    name: string;
    slug: string;
    image: ProductCategoryImage;
    count: number;
    parent?: number;         //	integer	The ID for the parent of the resource.
    description: string     //	HTML description of the resource.
    display: string      //	Category archive display type. Options: default, products, subcategories and both. Default is default.
    menu_order: number;     //	Menu order, used to custom sort the resource.
}
