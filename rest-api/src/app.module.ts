import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from './domain/enums/service';

@Global()
@Module({
  imports: [
    AuthModule,
    UsersModule,
    EventsModule,
    ProductsModule,
    ClientsModule.register([
      {
        name: Service.CORE,
        transport: Transport.TCP,
        options: {
          host: 'core',
          port: 3001,
        },
      },
      {
        name: Service.REDIS,
        transport: Transport.REDIS,
        options: {
          url: 'redis://redis:6379',
        }
      },
    ])],
  controllers: [AppController],
  exports: [ClientsModule],
})
export class AppModule {
}
