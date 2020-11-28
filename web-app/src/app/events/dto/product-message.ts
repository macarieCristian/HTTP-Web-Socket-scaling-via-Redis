import {ProductMessageType} from '../../domain/product-message-type';
import {Product} from '../../domain/product.model';

export class ProductMessage {
  constructor(public type: ProductMessageType,
              public serverId: string,
              public payload?: Product | string) {
  }
}
