import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../events/web-socket.service';
import {ProductMessageType} from '../domain/product-message-type';
import {ProductsService} from './products.service';
import {Product} from '../domain/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private webSocketService: WebSocketService,
              private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.subscription = this.webSocketService.product
      .subscribe(message => {
        switch (message.type) {
          case ProductMessageType.PRODUCT_DELETED:
            this.productsService.deleteProduct(message.payload as string);
            break;
          case ProductMessageType.PRODUCT_UPDATED:
            this.productsService.updateProduct(message.payload as Product);
            break;
          case ProductMessageType.PRODUCT_CREATED:
            this.productsService.addProduct(message.payload as Product);
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
