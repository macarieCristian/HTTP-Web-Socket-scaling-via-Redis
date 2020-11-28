import { Product } from '../../../domain/product.model';

export class ProductDtoOut {
  constructor(public uuid: string,
              public name: string,
              public description: string,
              public imageUrl: string,
              public price: number,
              public quantity: number) {
  }

  static toDto(product: Product): ProductDtoOut {
    return new ProductDtoOut(
      product.uuid,
      product.name,
      product.description,
      product.imageUrl,
      product.price,
      product.quantity);
  }
}
