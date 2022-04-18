import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /**
     * Register validation
     */
    app.useGlobalPipes(new ValidationPipe())

    /**
     * Register Swagger API Documentations
     */
    const config = new DocumentBuilder()
        .setTitle('Template System by NerualCode')
        .setDescription('This is a template that can be use as a starter backend application.')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(3000);
}

bootstrap();
