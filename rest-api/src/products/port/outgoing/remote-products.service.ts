import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Service } from '../../../domain/enums/service';
import { ClientProxy } from '@nestjs/microservices';
import { Product } from '../../../domain/product.model';
import { Commands } from '../../../domain/enums/commands';
import { ExceptionCode } from '../../../domain/enums/exception-code';

@Injectable()
export class RemoteProductsService {
  constructor(@Inject(Service.CORE) private client: ClientProxy) {
  }

  private static handleError(err): void {
    console.error(err);
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.NOT_FOUND:
        throw new NotFoundException(err.message);
      default:
        throw new HttpException('Internal server error.', 500);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.client.send<Product[]>(
        { cmd: Commands.GET_ALL_PRODUCTS },
        '',
      ).toPromise();
    } catch (error) {
      RemoteProductsService.handleError(error);
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      return await this.client.send<Product>(
        { cmd: Commands.GET_PRODUCT },
        id,
      ).toPromise();
    } catch (error) {
      RemoteProductsService.handleError(error);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      return await this.client.send<Product>(
        { cmd: Commands.CREATE_PRODUCT },
        product,
      ).toPromise();
    } catch (error) {
      RemoteProductsService.handleError(error);
    }
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      return await this.client.send<Product>(
        { cmd: Commands.UPDATE_PRODUCT },
        product,
      ).toPromise();
    } catch (error) {
      RemoteProductsService.handleError(error);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      return await this.client.send<string>(
        { cmd: Commands.DELETE_PRODUCT },
        id,
      ).toPromise();
    } catch (error) {
      RemoteProductsService.handleError(error);
    }
  }
}
