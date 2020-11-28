import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../domain/product.model';
import {Subscription} from 'rxjs';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.subscription = this.productsService.productsChanged
      .subscribe(
        (products: Product[]) => this.products = products
      );
    this.products = this.productsService.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
