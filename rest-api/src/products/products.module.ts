import { Module } from '@nestjs/common';
import { ProductsController } from './port/incoming/products.controller';
import { ProductsService } from './core/products.service';
import { EventsModule } from '../events/events.module';
import { RemoteProductsService } from './port/outgoing/remote-products.service';
import { RedisService } from './port/outgoing/redis.service';
import { RedisController } from './port/incoming/redis.controller';

@Module({
  imports: [EventsModule],
  controllers: [ProductsController, RedisController],
  providers: [ProductsService, RemoteProductsService, RedisService],
})
export class ProductsModule {}
