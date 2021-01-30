import { Product } from "../product/product";

export interface Processor{
    basic?: Product;
    manf?:string;
    model?:string;
    id?:number;
    part_number?:string;
    core?:number;
    thread?:number;
    core_clock?: number;
    boost_clock?: number;
    series?: string;
    architecture?:string;
    core_family?:string;
    integrated_gpu?: string;
    socket?: string;
    max_support_memory?:number;
    ecc_support?:string;
    cpu_cooler?:string;
    packaging?:string;
    l1_cache_instruction?:string;
    l1_cache_data?:string;
    l2_cache?:string;
    l3_cache?:string;
    lithiography?:string;
    type_of_ram?:string;
    warrenty?:string;
    TDP?: number;
    OPTANE_MEM_SUP?: string;
    RAM_TYPE?: string;
    MEMORY_CHANNEL?: string;
    description?:string;
    exclude?: string;
}