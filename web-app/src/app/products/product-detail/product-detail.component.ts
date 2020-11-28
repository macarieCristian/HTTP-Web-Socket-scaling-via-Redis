import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../domain/product.model';
import {ProductsService} from '../products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {combineLatest, Subscription} from 'rxjs';
import {ProductsHttpService} from '../products-http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  id: string;
  private subscription: Subscription;

  constructor(private productsService: ProductsService,
              private productsHttpService: ProductsHttpService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = combineLatest([this.route.params, this.productsService.productsChanged]).pipe(
      tap(([params, _]) => {
        this.id = params.id;
        this.product = this.productsService.getProductById(this.id);
        if (!this.product) {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      })
    ).subscribe();
  }

  onEditProduct(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteProduct(): void {
    this.productsHttpService.deleteProduct(this.id).subscribe();
  }

}
