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

@Injectable({
  providedIn: 'root'
})
export class WoocommerceService {

  private url = environment.backend_api_url;
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
    console.log(`${this.url}/products/categories?per_page=100&hide_empty=true&parent=0`);
    return this.httpClient.get<CategoryModel[]>(`/products/categories?per_page=100&hide_empty=true&parent=0`);
  }
  getSingleProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`/products/${id}`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`/products?search=${keyword}`);
  }
  getAllCategoriesbyId(id: number): Observable<Product[]> {
    console.log(`${this.url}/products?category=${id}`);
    return this.httpClient.get<Product[]>(`/products?category=${id}`);
  }
  getAllCategoriesbyName(name: string): Observable<Product[]> {
    console.log(`${this.url}/products?category=${name}`);
    return this.httpClient.get<Product[]>(`/products?category=${name}`);
  }
  getProductVariationById(prodId: number, variationId: number): Observable<Product[]> {
    console.log(`${this.url}/products/${prodId}/variations/${variationId}`);
    return this.httpClient.get<Product[]>(`/products/${prodId}/variations/${variationId}`);
  }
  getProductVariationsByProductId(prodId: number): Observable<Product[]> {
    console.log(`${this.url}/products/${prodId}/variations`);
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

    return this.httpClient.get<Product[]>(`/products?page=${pageNumber}&per_page=5&on_sale=true`);
  }
  getListOfProducts(pageNumber: number = 1): Observable<Product[]> {

    return this.httpClient.get<Product[]>(`/products?page=${pageNumber}&per_page=5`);
  }

  getAllProcessors(){
    return this.httpClient.get<Product[]>(`/products?category=22`);
  }
  processorFactory(products: Product[]){
    let processors: Processor[]=[];
    for(let i = 0; i< products.length; i++){
        
      let desc: string = products[i].description;
      if(desc.indexOf('{')!=-1){
        let regex = /(<([^>]+)>)/ig       //to remove html tag
        let descJSON = JSON.parse(desc.replace(regex,""));
        let processor: Processor={
          basic: products[i],
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
          description: descJSON["description"],
          exclude: descJSON["exclude"]
        };
        processors.push(processor);
      }        
    } 
    console.log(processors);
    return processors;
  }
}
