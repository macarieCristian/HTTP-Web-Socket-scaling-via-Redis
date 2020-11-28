import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../../core/products.service';
import { ProductListDtoOut } from '../dto/product-list-dto-out';
import { ProductDtoOut } from '../dto/product-dto-out';
import { ProductDtoIn } from '../dto/product-dto-in';
import { JwtAuthorizationGuard } from '../../../auth/guards/jwt-authorization.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
  }

  @Get()
  @Header('ServerId', process.env.APPID || 'LOCAL')
  async getAllProducts(): Promise<ProductListDtoOut> {
    return ProductListDtoOut.toDto(await this.productsService.getAllProducts());
  }

  @Get(':id')
  @Header('ServerId', process.env.APPID || 'LOCAL')
  async getProductById(@Param('id') id: string): Promise<ProductDtoOut> {
    return ProductDtoOut.toDto(await this.productsService.getProductById(id));
  }

  @Post()
  @UseGuards(JwtAuthorizationGuard)
  @HttpCode(204)
  @Header('ServerId', process.env.APPID || 'LOCAL')
  async createProduct(@Body() productDtoIn: ProductDtoIn): Promise<void> {
    await this.productsService.createProduct(ProductDtoIn.toEntity(productDtoIn));
  }

  @Put(':id')
  @UseGuards(JwtAuthorizationGuard)
  @HttpCode(204)
  @Header('ServerId', process.env.APPID || 'LOCAL')
  async updateProduct(@Param('id') id: string,
                @Body() productDtoIn: ProductDtoIn): Promise<void> {
    await this.productsService.updateProduct(id, ProductDtoIn.toEntity(productDtoIn));
  }

  @Delete(':id')
  @UseGuards(JwtAuthorizationGuard)
  @HttpCode(204)
  @Header('ServerId', process.env.APPID || 'LOCAL')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
