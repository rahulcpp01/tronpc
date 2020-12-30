import { Product } from "../product/product";

export interface HDD{
    basic?: Product;
    description?:string;
    exclude?: string;


    MANUFACT?: string;
    PART_NO?: string;
    CAPACITY?: string;
    CACHE?: string;
    FORM_FACT?: string;
    INTERFACE?: string;
    VOL?: string;
    TDP?: number;
    RPM?: number;
}