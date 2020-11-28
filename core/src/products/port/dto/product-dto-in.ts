import {Product} from "../../schemas/product.schema";

export class ProductDtoIn {
    constructor(public name: string,
                public description: string,
                public imageUrl: string,
                public price: number,
                public quantity: number) {
    }

    static toEntity(productDtoIn: ProductDtoIn): Product {
        return {
            name: productDtoIn.name,
            description: productDtoIn.description,
            imageUrl: productDtoIn.imageUrl,
            price: productDtoIn.price,
            quantity: productDtoIn.quantity
        };
    }
}
