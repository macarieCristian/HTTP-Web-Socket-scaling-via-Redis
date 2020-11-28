import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../domain/product.model';
import {ProductsHttpService} from './products-http.service';
import {ProductsService} from './products.service';

@Injectable({providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {

  constructor(private productsHttpService: ProductsHttpService,
              private productsService: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {
    const products = this.productsService.getAllProducts();
    if (products.length === 0) {
      return this.productsHttpService.getAllProducts();
    } else {
      return products;
    }
  }
}
