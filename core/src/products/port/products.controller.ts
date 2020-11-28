import {Controller} from '@nestjs/common';
import {ProductsService} from "../core/products.service";
import {ProductDtoIn} from "./dto/product-dto-in";
import {ProductDto} from "./dto/product-dto";
import {MessagePattern} from "@nestjs/microservices";
import {Commands} from "../../domain/enums/commands";

@Controller()
export class ProductsController {
    constructor(private productsService: ProductsService) {
    }

    @MessagePattern({ cmd: Commands.GET_ALL_PRODUCTS })
    async getAllProducts(): Promise<ProductDto[]> {
        const products = await this.productsService.findAll();
        return products.map(ProductDto.toDto);
    }

    @MessagePattern({ cmd: Commands.GET_PRODUCT })
    async getProductById(id: string): Promise<ProductDto> {
        return ProductDto.toDto(await this.productsService.findById(id));
    }

    @MessagePattern({ cmd: Commands.CREATE_PRODUCT })
    async createProduct(productDtoIn: ProductDtoIn): Promise<ProductDto> {
        return ProductDto.toDto(await this.productsService.create(ProductDtoIn.toEntity(productDtoIn)));
    }

    @MessagePattern({ cmd: Commands.UPDATE_PRODUCT })
    async updateProduct(productDtoIn: ProductDto): Promise<ProductDto> {
        return ProductDto.toDto(await this.productsService.update(productDtoIn.uuid, ProductDto.toEntity(productDtoIn)));
    }

    @MessagePattern({ cmd: Commands.DELETE_PRODUCT })
    async deleteProduct(id: string): Promise<string> {
        await this.productsService.delete(id);
        return id;
    }
}
