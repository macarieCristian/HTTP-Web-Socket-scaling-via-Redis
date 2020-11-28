import { ProductDtoOut } from './product-dto-out';
import { Product } from '../../../domain/product.model';

export class ProductListDtoOut {
  constructor(public products: ProductDtoOut[]) {
  }

  static toDto(products: Product[]): ProductListDtoOut {
    return new ProductListDtoOut(products.map(ProductDtoOut.toDto));
  }
}
