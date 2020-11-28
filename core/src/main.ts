import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.TCP,
            options: {
                host: 'core',
                port: 3001,
                retryAttempts: 5,
                retryDelay: 3000
            }
        },
    );
    await app.listenAsync();
    console.log("Started on 3001");
}

bootstrap();
