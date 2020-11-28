import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products.component';
import {ProductDefaultComponent} from './product-default/product-default.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductItemComponent} from './product-list/product-item/product-item.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent,
    ProductDefaultComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule {
}
