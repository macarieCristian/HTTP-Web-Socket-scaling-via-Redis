import {Injectable} from '@angular/core';
import {Product} from '../domain/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsChanged = new BehaviorSubject<Product[]>([]);
  products: Product[] = [];

  setProducts(products: Product[]): void {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getAllProducts(): Product[] {
    return this.products.slice();
  }

  getProductById(uuid: string): Product {
    return this.products.find(prod => prod.uuid === uuid);
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(prod => prod.uuid === product.uuid);
    this.products[index] = product;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(uuid: string): void {
    this.products = this.products.filter(prod => prod.uuid !== uuid);
    this.productsChanged.next(this.products.slice());
  }

}
