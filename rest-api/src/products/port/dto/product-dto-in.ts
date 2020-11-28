import { Product } from '../../../domain/product.model';

export class ProductDtoIn {
  constructor(public name: string,
              public description: string,
              public imageUrl: string,
              public price: number,
              public quantity: number) {
  }

  static toEntity(productDtoIn: ProductDtoIn): Product {
    return new Product(
      productDtoIn.name,
      productDtoIn.description,
      productDtoIn.imageUrl,
      productDtoIn.price,
      productDtoIn.quantity);
  }
}
