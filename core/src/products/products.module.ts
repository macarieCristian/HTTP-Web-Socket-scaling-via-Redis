import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./schemas/product.schema";
import { ProductsService } from './core/products.service';
import { ProductsController } from './port/products.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule {}
