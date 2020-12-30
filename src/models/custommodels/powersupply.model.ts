import { Product } from "../product/product";

export interface PowerSupply{
    basic?: Product;
    description?:string;
    exclude?: string;
    id?:number;
    
    BRAND?: string;
    MODEL?: string;
    PART_NO?: string;
    FORM_FACTOR?: string;
    EFFIC?: string;
    WATT?: string;
    LENGTH?: string;
    MODULAR?: string;
    FAN?: string;
    EPS_CONECTOR?: string;
    PCIE_6_2?: number;
    SATA?: number;
    MOLEX_4?: number;
    INTERNAL_2_5BAY?: number;
    INTERNAL_3_5BAY?: number;
    VOLUME?: string;
}