import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/models/CategoryModel';
import { OrderShipping } from 'src/models/orders/order.shipping';
import { ShippingZone } from 'src/models/shipping/shipping.zone';
import { Coupon } from 'src/models/coupon/coupon';
import { Product } from 'src/models/product/product';
import { Order } from 'src/models/orders/orders';
import { ShippingLocation } from 'src/models/shipping/shipping.location';
import { Processor } from 'src/models/custommodels/processor.model';
import { Case } from 'src/models/custommodels/case.model';
import { Cooler } from 'src/models/custommodels/cooler.model';
import { GPU } from 'src/models/custommodels/gpu.model';
import { HDD } from 'src/models/custommodels/hdd.model';
import { M2 } from 'src/models/custommodels/m2.model';
import { MotherBoard } from 'src/models/custommodels/motherboard.model';
import { PowerSupply } from 'src/models/custommodels/powersupply.model';
import { RAM } from 'src/models/custommodels/ram.model';
import { SSD } from 'src/models/custommodels/ssd.model';

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

  private url = environment.backend_api_url;
  private processorCategoryId: number = 22;
  private caseCategoryId: number = 23;
  private coolerCategoryId: number = 24;
  private gpuCategoryId: number = 25;
  private hddCategoryId: number = 26;
  private m2CategoryId: number = 27;
  private motherBoardCategoryId: number = 28;
  private powerSupplyCategoryId: number = 29;
  private RAMCategoryId: number = 30;
  private SSDCategoryId: number = 31;
  constructor(private httpClient: HttpClient) { }


  getAllProducts(pageNumber: number = 1): Observable<Product[]> {
    // return this.httpClient.get<Product[]>(`/products?page=${pageNumber}&per_page=10`);
    return this.httpClient.get<Product[]>(`/products`);
  }
  getAllOnSaleProducts(pageNumber: number = 1): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`/products?page=${pageNumber}&per_page=10&on_sale=true`);
  }
  getFeaturedProducts() {
    return this.httpClient.get<Product[]>(`/products?page=1&per_page=10&featured=true`);
  }
  getAllCategories(): Observable<CategoryModel[]> {
    //console.log(`${this.url}/products/categories?per_page=100&hide_empty=true&parent=0`);
    return this.httpClient.get<CategoryModel[]>(`/products/categories?per_page=100&hide_empty=true&parent=0`);
  }
  getSingleProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`/products/${id}`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`/products?search=${keyword}`);
  }
  getAllCategoriesbyId(id: number): Observable<Product[]> {
    //console.log(`${this.url}/products?category=${id}`);
    return this.httpClient.get<Product[]>(`/products?category=${id}`);
  }
  getAllCategoriesbyName(name: string): Observable<Product[]> {
   // console.log(`${this.url}/products?category=${name}`);
    return this.httpClient.get<Product[]>(`/products?category=${name}`);
  }
  getProductVariationById(prodId: number, variationId: number): Observable<Product[]> {
   // console.log(`${this.url}/products/${prodId}/variations/${variationId}`);
    return this.httpClient.get<Product[]>(`/products/${prodId}/variations/${variationId}`);
  }
  getProductVariationsByProductId(prodId: number): Observable<Product[]> {
    //console.log(`${this.url}/products/${prodId}/variations`);
    return this.httpClient.get<Product[]>(`/products/${prodId}/variations`);
  }
  getShippingZone(): Observable<ShippingZone[]> {
    return this.httpClient.get<ShippingZone[]>(`/shipping/zones`);;

  }
  getShippingLocationById(zoneId: number): Observable<ShippingLocation[]> {
    return this.httpClient.get<ShippingLocation[]>(`/shipping/zones/${zoneId}/locations`)
  }
  getAllShippingMethod(zoneId: number): Observable<ShippingZone[]> {
    return this.httpClient.get<ShippingZone[]>(`/shipping/zones/${zoneId}/methods`)
  }
  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(`/coupons`)
  }
  getProductsBySale(pageNumber: number = 1): Observable<Product[]> {

    return this.httpClient.get<Product[]>(`/products?on_sale=true`);
  }
  getListOfProducts(pageNumber: number = 1): Observable<Product[]> {

    return this.httpClient.get<Product[]>(`/products?page=${pageNumber}&per_page=5`);
  }

  getAllProcessors(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.processorCategoryId);
  }
  processorsFactory(products: Product[]){
    let processors: Processor[]=[];
    for(let i = 0; i< products.length; i++){
      processors.push(this.createProcessor(products[i]));           
    } 
    //console.log(processors);
    sessionStorage["processors"] = JSON.stringify(processors);
    // return processors;
  }

  createProcessor(product: Product): Processor{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let processor: Processor={
      basic: product,
      id:product.id,
      manf: descJSON["manf"],
      model: descJSON["model"],
      part_number: descJSON["part_number"],
      core: Number.parseInt(descJSON["core"]),
      thread: Number.parseInt(descJSON["thread"]),
      core_clock: Number.parseInt(descJSON["core_clock"]),
      boost_clock: Number.parseInt(descJSON["boost_clock"]),
      tdp: Number.parseInt(descJSON["tdp"]),
      series: descJSON["series"],
      architecture: descJSON["architecture"],
      core_family: descJSON["core_family"],
      integrated_gpu: descJSON["integrated_gpu"],
      socket: descJSON["socket"],
      max_support_memory: Number.parseInt(descJSON["max_support_memory"]),
      ecc_support: descJSON["ecc_support"],
      cpu_cooler: descJSON["cpu_cooler"],
      packaging: descJSON["packaging"],
      l1_cache_instruction: descJSON["l1_cache_instruction"],
      l1_cache_data: descJSON["l1_cache_data"],
      l2_cache: descJSON["l2_cache"],
      l3_cache: descJSON["l3_cache"],
      lithiography: descJSON["lithiography"],

      type_of_ram: descJSON["type_of_ram"],
      warrenty: descJSON["warrenty"],
      TDP: Number.parseInt(descJSON["TDP"]),
      OPTANE_MEM_SUP: descJSON["OPTANE_MEM_SUP"],
      description: descJSON["description"],
      exclude: descJSON["exclude"]
    };
    return processor;       
  }
 
  getAllCases(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.caseCategoryId);
  }
  casesFactory(products: Product[]){
    let cases: Case[] = [];
    for(let i = 0; i< products.length; i++){
      cases.push(this.createCase(products[i]));           
    } 
    //console.log(cases);
    sessionStorage["cases"] = JSON.stringify(cases);
    // return cases;
  }

  createCase(product: Product): Case{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let casev: Case={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],
      BRAND: descJSON["BRAND"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      TYPE: descJSON["TYPE"],
      COLOUR: descJSON["COLOUR"],
      POWER_SUPPLY: descJSON["POWER_SUPPLY"],
      SIDE_PANEL: descJSON["SIDE_PANEL"],
      POWER_SUPPLY_SHROUD: descJSON["POWER_SUPPLY_SHROUD"],
      FRONT_PANEL_USB: descJSON["FRONT_PANEL_USB"],
      MOB_FORM_FACT: descJSON["MOB_FORM_FACT"],
      FULL_HT_EXP_SLT: Number.parseInt(descJSON["FULL_HT_EXP_SLT"]),
      HLF_HT_EXP_SLT: Number.parseInt(descJSON["HLF_HT_EXP_SLT"]),
      MAX_GPU_LENGTH: Number.parseInt(descJSON["MAX_GPU_LENGTH"]),
      DIMENTIONS: descJSON["DIMENTIONS"],
      INTERNAL_2_5BAY: descJSON["INTERNAL_2_5BAY"],
      INTERNAL_3_5BAY: descJSON["INTERNAL_3_5BAY"],
      VOLUME: descJSON["VOLUME"],
      OPTICAL_DRIVE: descJSON["DIMENTIONS"],
      NO_OF_FAN: Number.parseInt(descJSON["NO_OF_FAN"]),
      ARGB: descJSON["ARGB"]
    };
    return casev;       
  }

  getAllCoolers(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.coolerCategoryId);
  }
  coolersFactory(products: Product[]){
    let coolers: Cooler[] = [];
    for(let i = 0; i< products.length; i++){
      coolers.push(this.createCooler(products[i]));           
    } 
    //console.log(coolers);
    sessionStorage["coolers"] = JSON.stringify(coolers);
    // return coolers;
  }

  createCooler(product: Product): Cooler{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let cooler: Cooler={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],
      BRAND: descJSON["BRAND"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      FAN_RPM: Number.parseInt(descJSON["FAN_RPM"]),
      NOISE: descJSON["NOISE"],
      BEARING: descJSON["BEARING"],
      HEIGHT: descJSON["HEIGHT"],
      WATER: descJSON["WATER"],
      FAN: descJSON["FAN"],
      CPU_SOCKET_LIST: descJSON["CPU_SOCKET_LIST"],      
    };
    return cooler; 
  }

  getAllGPUs(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.gpuCategoryId);
  }
  gpusFactory(products: Product[]){
    let gpu: GPU[] = [];
    for(let i = 0; i< products.length; i++){
      gpu.push(this.createGPU(products[i]));           
    } 
    //console.log(gpu);
    sessionStorage["gpu"] = JSON.stringify(gpu);
    // return gpu;
  }

  createGPU(product: Product): GPU{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let cooler: GPU={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      BRAND: descJSON["BRAND"],
      MAKE: descJSON["MAKE"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      MEMORY: descJSON["MEMORY"],
      MEMORY_TYPE: descJSON["MEMORY_TYPE"],
      EFFECT_MEM_CLK_GPU: descJSON["EFFECT_MEM_CLK_GPU"],
      BOOST_CLK_GPU: Number.parseInt(descJSON["BOOST_CLK_GPU"]),
      INTERFACE: descJSON["INTERFACE"],
      SLI_CROSSFIRE: descJSON["SLI_CROSSFIRE"],
      DVI_PORT_GPU: Number.parseInt(descJSON["DVI_PORT_GPU"]),
      HDMI_PORT_GPU: Number.parseInt(descJSON["HDMI_PORT_GPU"]),
      MINI_HDMI_PORT_GPU: Number.parseInt(descJSON["MINI_HDMI_PORT_GPU"]),
      DISLAY_PORT_GPU: Number.parseInt(descJSON["DISLAY_PORT_GPU"]),
      EXP_SLT_WIDTH: Number.parseInt(descJSON["EXP_SLT_WIDTH"]),
      COOLING: descJSON["COOLING"],  
      EXT_PWR: descJSON["EXT_PWR"], 
      TDP: Number.parseInt(descJSON["TDP"])     
    };
    return cooler; 
  }


  getAllHDDs(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.hddCategoryId);
  }
  hddsFactory(products: Product[]){
    let hdds: HDD[] = [];
    for(let i = 0; i< products.length; i++){
      hdds.push(this.createHDD(products[i]));           
    } 
    //console.log(hdds);
    sessionStorage["hdds"] = JSON.stringify(hdds);
    // return hdds;
  }

  createHDD(product: Product): HDD{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let hdd: HDD={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      MANUFACT: descJSON["MANUFACT"],
      PART_NO: descJSON["PART_NO"],
      CAPACITY: descJSON["CAPACITY"],
      CACHE: descJSON["CACHE"],
      FORM_FACT: descJSON["FORM_FACT"],
      INTERFACE: descJSON["INTERFACE"],
      VOL: descJSON["VOL"],     
      TDP: Number.parseInt(descJSON["TDP"]),
      RPM: Number.parseInt(descJSON["RPM"])      
    };
    return hdd; 
  }

  getAllM2s(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.m2CategoryId);
  }
  M2sFactory(products: Product[]){
    let m2s: M2[] = [];
    for(let i = 0; i< products.length; i++){
      m2s.push(this.createM2(products[i]));           
    } 
    //console.log(m2s);    
    sessionStorage["m2s"] = JSON.stringify(m2s);
    // return m2s;
  }

  createM2(product: Product): M2{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let m2: M2={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      MANUFACT: descJSON["MANUFACT"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      CAPACITY: descJSON["CAPACITY"],
      INTERFACE: descJSON["INTERFACE"],
      FORM_FACT: descJSON["FORM_FACT"],     
      TDP: Number.parseInt(descJSON["TDP"]),
      NVME: descJSON["NVME"] 
    };
    return m2; 
  }


  getAllMotherBoards(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.motherBoardCategoryId);
  }
  motherBoardsFactory(products: Product[]){
    let motherboards: MotherBoard[] = [];
    for(let i = 0; i< products.length; i++){
      motherboards.push(this.createMotherBoard(products[i]));           
    } 
    //console.log(motherboards);    
    sessionStorage["motherboards"] = JSON.stringify(motherboards);
    // return motherboards;
  }

  createMotherBoard(product: Product): MotherBoard{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let motherboard: MotherBoard={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      MANUFACT_MOB: descJSON["MANUFACT_MOB"],
      MODEL_NO_MOB: descJSON["MODEL_NO_MOB"],
      FORMFACT_MOB: descJSON["FORMFACT_MOB"],
      SOCKET_MOB: descJSON["SOCKET_MOB"],
      MEM_MAX: descJSON["MEM_MAX"],
      MEM_TYPE_MOB: descJSON["MEM_TYPE_MOB"],  

      MEM_SLOTS: Number.parseInt(descJSON["MEM_SLOTS"]),
      MEM_SPEED: descJSON["MEM_SPEED"],
      COLOUR: descJSON["COLOUR"],
      SLI_CROSSFIRE: descJSON["SLI_CROSSFIRE"],
      PCIE_16: Number.parseInt(descJSON["PCIE_16"]),
      PCIE_8: Number.parseInt(descJSON["PCIE_8"]), 

      PCIE_4: Number.parseInt(descJSON["PCIE_4"]),
      PCIE_1: Number.parseInt(descJSON["PCIE_1"]), 
      M2: descJSON["M2"],
      M2GEN: Number.parseInt(descJSON["M2GEN"]),
      M2COUNT: Number.parseInt(descJSON["M2COUNT"]), 
      MSATA: descJSON["MSATA"],

      ETHER: descJSON["ETHER"],
      SATA_SPEED: descJSON["SATA_SPEED"],
      SATA_SPD_CNT: Number.parseInt(descJSON["SATA_SPD_CNT"]), 
      ONBOARD_VID: descJSON["ONBOARD_VID"],
      USB_2_0: descJSON["USB_2_0"],
      USB_3_1_Gen_1: descJSON["USB_3_1_Gen_1"],
      USB_3_2_Gen_1: descJSON["USB_3_2_Gen_1"],
      USB_3_2_Gen: descJSON["USB_3_2_Gen"],
      ECC: descJSON["ECC"],
      WIRELESS: descJSON["WIRELESS"],
      RAID: descJSON["RAID"],
      TDP: Number.parseInt(descJSON["TDP"]),
      CPU_SUPPORTED_LIST: descJSON["CPU_SUPPORTED_LIST"]  
    };
    return motherboard; 
  }

  getAllPowerSupplies(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.powerSupplyCategoryId);
  }
  PowerSuppliesFactory(products: Product[]){
    let powersupplies: PowerSupply[] = [];
    for(let i = 0; i< products.length; i++){
      powersupplies.push(this.createPowerSupply(products[i]));           
    } 
    //console.log(powersupplies);
    sessionStorage["powersupplies"] = JSON.stringify(powersupplies);
    // return powersupplies;
  }

  createPowerSupply(product: Product): PowerSupply{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let powersupply: PowerSupply={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      BRAND: descJSON["BRAND"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      FORM_FACTOR: descJSON["FORM_FACTOR"],
      EFFIC: descJSON["EFFIC"],
      WATT: descJSON["WATT"],     

      LENGTH: descJSON["LENGTH"], 
      MODULAR: descJSON["MODULAR"] ,
      FAN: descJSON["FAN"] ,
      EPS_CONECTOR: descJSON["EPS_CONECTOR"] ,
      PCIE_6_2: Number.parseInt(descJSON["PCIE_6_2"]),
      SATA: Number.parseInt(descJSON["SATA"]),
      MOLEX_4: Number.parseInt(descJSON["MOLEX_4"]),
      INTERNAL_2_5BAY: Number.parseInt(descJSON["INTERNAL_2_5BAY"]),
      INTERNAL_3_5BAY: Number.parseInt(descJSON["INTERNAL_3_5BAY"]),
      VOLUME: descJSON["VOLUME"] 
    };
    return powersupply; 
  }

  getAllRAMs(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.RAMCategoryId);
  }
  RAMsFactory(products: Product[]){
    let rams: RAM[] = [];
    for(let i = 0; i< products.length; i++){
      rams.push(this.createRAM(products[i]));           
    } 
    //console.log(rams);    
    sessionStorage["rams"] = JSON.stringify(rams);
    // return rams;
  }

  createRAM(product: Product): RAM{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let ram: RAM={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      MANUFACT: descJSON["MANUFACT"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      SPEED: descJSON["SPEED"],
      MODULE: descJSON["MODULE"],
      COLOUR: descJSON["COLOUR"],     

      FIRST_WORLD_LAT: descJSON["FIRST_WORLD_LAT"],       
      CAS_LAT: Number.parseInt(descJSON["CAS_LAT"]),
      VOL: descJSON["VOL"] ,
      TIMING: descJSON["TIMING"] ,
      HEAT_SINK: descJSON["HEAT_SINK"] ,
      ECC_REGISTERED: descJSON["ECC_REGISTERED"],
      TDP: Number.parseInt(descJSON["TDP"])
       
    };
    return ram; 
  }

  getAllSSDs(){
    return this.httpClient.get<Product[]>(`/products?category=`+ this.SSDCategoryId);
  }
  SSDsFactory(products: Product[]){
    let ssds: SSD[] = [];
    for(let i = 0; i< products.length; i++){
      ssds.push(this.createSSD(products[i]));           
    } 
    //console.log(ssds);
    sessionStorage["ssds"] = JSON.stringify(ssds);
    // return ssds;
  }

  createSSD(product: Product): SSD{
    let desc: string = product.description;    
    let regex = /(<([^>]+)>)/ig       //to remove html tag
    let descJSON = JSON.parse(desc.replace(regex,""));
    let ssd: SSD={
      basic: product,
      id:product.id,
      description: descJSON["description"],
      exclude: descJSON["exclude"],

      MANUFACT: descJSON["MANUFACT"],
      MODEL: descJSON["MODEL"],
      PART_NO: descJSON["PART_NO"],
      CAPACITY: descJSON["CAPACITY"],
      INTERFACE: descJSON["INTERFACE"],
      FORM_FACT: descJSON["FORM_FACT"],         
      TDP: Number.parseInt(descJSON["TDP"]),
      TYPE: descJSON["TYPE"]        
    };
    return ssd; 
  }

  getProductsFromSession( type: string){
    return JSON.parse(sessionStorage[type]);
  }

  getProductFromSession(id: number, type: string){
    return this.getProductsFromSession(type).find((x: { id: number; })=> x.id == id);
  }
}
