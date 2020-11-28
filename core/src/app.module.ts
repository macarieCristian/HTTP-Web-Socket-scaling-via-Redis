import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductsModule} from './products/products.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://mongo:27017/productsdb'),
      ProductsModule
  ]
})
export class AppModule {}
