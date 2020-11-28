import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Product, ProductDocument} from "../schemas/product.schema";
import {Model} from "mongoose";
import {RpcException} from "@nestjs/microservices";
import {ExceptionValueObject} from "../../domain/exception-value-object";
import {ExceptionCode} from "../../domain/enums/exception-code";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    }

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<ProductDocument> {
        return this.findProduct(id);
    }

    async create(product: Product): Promise<ProductDocument> {
        const createdCat = new this.productModel(product);
        return createdCat.save();
    }

    async update(id: string, product: Product): Promise<ProductDocument> {
        const productDocument = await this.findProduct(id);
        if (product.name) {
            productDocument.name = product.name;
        }
        if (product.description) {
            productDocument.description = product.description;
        }
        if (product.imageUrl) {
            productDocument.imageUrl = product.imageUrl;
        }
        if (product.price) {
            productDocument.price = product.price;
        }
        if (product.quantity) {
            productDocument.quantity = product.quantity;
        }
        return productDocument.save();
    }

    async delete(prodId: string): Promise<void> {
        let result;
        try {
            result = await this.productModel.deleteOne({_id: prodId}).exec();
        } catch (_) {
            throw new RpcException(new ExceptionValueObject(ExceptionCode.NOT_FOUND, 'Could not find product.'));
        }
        if (!result || result.n === 0) {
            throw new RpcException(new ExceptionValueObject(ExceptionCode.NOT_FOUND, 'Could not find product.'));
        }
    }

    private async findProduct(id: string): Promise<ProductDocument> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new RpcException(new ExceptionValueObject(ExceptionCode.NOT_FOUND, 'Could not find product.'));
        }
        if (!product) {
            throw new RpcException(new ExceptionValueObject(ExceptionCode.NOT_FOUND, 'Could not find product.'));
        }
        return product;
    }
}
