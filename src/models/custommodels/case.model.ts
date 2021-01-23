import { Product } from "../product/product";

export interface Case{
    basic?: Product;
    description?:string;
    exclude?: string;

    id?:number;
    BRAND?:string;
    MODEL?:string;
    PART_NO?:string;
    TYPE?:string;
    COMP_TYPE?:string;
    COLOUR?:string;
    POWER_SUPPLY?:string;
    SIDE_PANEL?:string;
    POWER_SUPPLY_SHROUD?:string;
    FRONT_PANEL_USB?:string;
    MOB_FORM_FACT?:string;
    FULL_HT_EXP_SLT?:number;
    HLF_HT_EXP_SLT?:number;
    MAX_GPU_LENGTH?:number;
    DIMENTIONS?:string;
    INTERNAL_2_5BAY?:string;
    INTERNAL_3_5BAY?:string;
    VOLUME?:string;
    OPTICAL_DRIVE?:string;
    NO_OF_FAN?:number;
    ARGB?:string;
    MAX_CPU_HEIGHT?: string;
    PSU_SUPPORT_LENGTH?: string;
    RADIATOR_SUP_FRONT?: string;
    RADIATOR_SUP_REAR?: string;
    RADIATOR_SUP_SIDE?: string;
    RADIATOR_SUP_TOP?: string;
    TDP?: number; 
}