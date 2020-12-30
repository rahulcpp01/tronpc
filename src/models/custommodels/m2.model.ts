import { Product } from "../product/product";

export interface M2{
    basic?: Product;
    description?:string;
    exclude?: string;
    id?:number;
    
    MANUFACT?: string;
    MODEL?: string;
    PART_NO?: string;
    CAPACITY?: string;
    INTERFACE?: string;
    FORM_FACT?: string;
    TDP?: number;
    NVME?: string;
}