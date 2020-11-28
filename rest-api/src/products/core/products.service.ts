import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product.model';
import { WebsocketMessage } from '../../events/port/dto/websocket-message';
import { WebsocketMessageType } from '../../domain/enums/websocket-message-type';
import { RemoteProductsService } from '../port/outgoing/remote-products.service';
import { RedisService } from '../port/outgoing/redis.service';
import { RedisChannels } from '../../domain/enums/redis-channels';

@Injectable()
export class ProductsService {

  constructor(private remoteProductsService: RemoteProductsService,
              private redisService: RedisService) {
  }

  async getAllProducts(): Promise<Product[]> {
    return this.remoteProductsService.getAllProducts();
  }

  async getProductById(id: string): Promise<Product> {
    return this.remoteProductsService.getProductById(id);
  }

  async createProduct(product: Product): Promise<void> {
    const createdProduct = await this.remoteProductsService.createProduct(product);
    this.redisService.publishMessage(RedisChannels.WS_MESSAGES,
      WebsocketMessage.toMsg(WebsocketMessageType.PRODUCT_CREATED, createdProduct));
  }

  async updateProduct(id: string, product: Product): Promise<void> {
    const updatedProduct = await this.remoteProductsService.updateProduct({
      ...product,
      uuid: id,
    });
    this.redisService.publishMessage(RedisChannels.WS_MESSAGES,
      WebsocketMessage.toMsg(WebsocketMessageType.PRODUCT_UPDATED, updatedProduct));
  }

  async deleteProduct(id: string): Promise<void> {
    const deletedProductId = await this.remoteProductsService.deleteProduct(id);
    this.redisService.publishMessage(RedisChannels.WS_MESSAGES,
      WebsocketMessage.toMsg(WebsocketMessageType.PRODUCT_DELETED, deletedProductId));
  }
}
