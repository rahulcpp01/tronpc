import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { WoocommerceService } from './woocommerce.service';

@Injectable({
    providedIn: 'root'
})
export class ProductResolverService implements Resolve<any> {

    constructor(private productService: WoocommerceService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        const id = route.params.id;
        return this.productService.getSingleProduct(id);
    }
}
