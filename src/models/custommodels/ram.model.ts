import { Product } from "../product/product";

export interface RAM{
    basic?: Product;
    description?:string;
    exclude?: string;
    id?:number;
    MANUFACT?: string;
    MODEL?: string;
    PART_NO?: string;
    SPEED?: string;
    MODULE?: string;
    COLOUR?: string;
    FIRST_WORLD_LAT?: string;
    CAS_LAT?: number;
    VOL?: string;
    TIMING?: string;
    HEAT_SINK?: string;
    ECC_REGISTERED?: string;
    TDP?: number;
    MEM_TYPE_RAM?: string;

}