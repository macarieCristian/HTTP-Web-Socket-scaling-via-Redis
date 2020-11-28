import {Product, ProductDocument} from "../../schemas/product.schema";

export class ProductDto {
    constructor(public uuid: string,
                public name: string,
                public description: string,
                public imageUrl: string,
                public price: number,
                public quantity: number) {
    }

    static toDto(productDocument: ProductDocument): ProductDto {
        return new ProductDto(
            productDocument.id,
            productDocument.name,
            productDocument.description,
            productDocument.imageUrl,
            productDocument.price,
            productDocument.quantity);
    }

    static toEntity(productDto: ProductDto): Product {
        return {
            name: productDto.name,
            description: productDto.description,
            imageUrl: productDto.imageUrl,
            price: productDto.price,
            quantity: productDto.quantity
        };
    }
}
