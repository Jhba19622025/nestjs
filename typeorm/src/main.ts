import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  // Swagger (OpenAPI 3) — NestJS v11
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API documentation')
    .setVersion('1.0.0')
    .addBearerAuth() // Authorization: Bearer <token>
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // include: [SomeModule], // opcional: limitar módulos
    // deepScanRoutes: true,  // opcional: herencia/decoradores avanzados
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
