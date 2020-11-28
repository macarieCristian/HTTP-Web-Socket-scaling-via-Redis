import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {ProductsHttpService} from '../products-http.service';
import {combineLatest, Subscription} from 'rxjs';
import {Product} from '../../domain/product.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  productForm: FormGroup;
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
        this.editMode = params.id != null;
        this.initForm();
      })
    ).subscribe();
  }

  onSubmit(): void {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) {
      return;
    }

    if (this.editMode) {
      this.productsHttpService.updateProduct(this.id, this.productForm.value)
        .subscribe(() => this.onCancel());
    } else {
      this.productsHttpService.createProduct(this.productForm.value)
        .subscribe(() => this.onCancel());
    }
  }

  onCancel(): void {
    this.productForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    let product = new Product('', '', '', null, null);
    if (this.editMode) {
      product = this.productsService.getProductById(this.id);
      if (!product) {
        this.router.navigate(['/products']);
      }
    }
    this.productForm = new FormGroup({
      name: new FormControl(product.name, Validators.required),
      imageUrl: new FormControl(product.imageUrl, Validators.required),
      description: new FormControl(product.description, Validators.required),
      price: new FormControl(product.price, Validators.required),
      quantity: new FormControl(product.quantity, Validators.required)
    });
  }
}
