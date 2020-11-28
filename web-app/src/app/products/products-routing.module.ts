import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductDefaultComponent} from './product-default/product-default.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductsResolverService} from './products-resolver.service';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      {path: '', component: ProductDefaultComponent},
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent, resolve: [ProductsResolverService]},
      {path: ':id/edit', component: ProductEditComponent, resolve: [ProductsResolverService]}
    ],
    resolve: [ProductsResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
