import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: 'http://localhost:4200',
      exposedHeaders: 'ServerId'
    },
  );

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://redis:6379',
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}

bootstrap();
