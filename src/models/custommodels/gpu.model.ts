import { Product } from "../product/product";

export interface GPU{
    basic?: Product;
    description?:string;
    exclude?: string;

    BRAND?: string;
    MAKE?: string;
    MODEL?: string;
    PART_NO?: string;
    MEMORY?: string;
    MEMORY_TYPE?: string;
    EFFECT_MEM_CLK_GPU?: string;
    BOOST_CLK_GPU?: number;
    INTERFACE?: string;
    SLI_CROSSFIRE?: string;
    DVI_PORT_GPU?: number;
    HDMI_PORT_GPU?: number;
    MINI_HDMI_PORT_GPU?: number;
    DISLAY_PORT_GPU?: number;
    EXP_SLT_WIDTH?: number;
    COOLING?: string;
    EXT_PWR?: string;
    TDP?: number;    
}