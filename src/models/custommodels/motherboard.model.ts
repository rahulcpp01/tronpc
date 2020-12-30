import { Product } from "../product/product";

export interface MotherBoard{
    basic?: Product;
    description?:string;
    exclude?: string;
    id?:number;
    MANUFACT_MOB?: string;
    MODEL_NO_MOB?: string;
    SOCKET_MOB?: string;
    FORMFACT_MOB?: string;
    MEM_MAX?: string;
    MEM_TYPE_MOB?: string;

    MEM_SLOTS?: number;
    MEM_SPEED?: string;
    COLOUR?: string;
    SLI_CROSSFIRE?: string;
    PCIE_16?: number;
    PCIE_8?: number;


    PCIE_4?: number;
    PCIE_1?: number;
    M2?: string;
    M2GEN?: number;
    M2COUNT?: number;
    MSATA?: string;

    ETHER?: string;
    SATA_SPEED?: string;
    SATA_SPD_CNT?: number;
    ONBOARD_VID?: string;
    USB_2_0?: string;
    USB_3_1_Gen_1?: string;
    USB_3_2_Gen_1?: string;
    USB_3_2_Gen?: string;
    ECC?: string;
    WIRELESS?: string;
    RAID?: string;
    TDP?: number;
}