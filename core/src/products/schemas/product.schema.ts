import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    imageUrl: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
