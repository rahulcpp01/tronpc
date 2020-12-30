import { Product } from "../product/product";

export interface Cooler{
    basic?: Product;
    description?:string;
    exclude?: string;
    id?:number;
    BRAND?: string;
    MODEL?: string;
    PART_NO?:string;    
    FAN_RPM?:number;
    NOISE?: string;
    BEARING?: string;
    HEIGHT?: string;
    WATER?: string;
    FAN?:number;
    CPU_SOCKET_LIST?: string;
}