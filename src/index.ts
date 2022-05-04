import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function configureSwagger() {
  return new DocumentBuilder()
    .setTitle('Pague o Aluguel API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .build();
}

function createSwaggerDocument(app) {
  const config = configureSwagger();
  return SwaggerModule.createDocument(app, config)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = createSwaggerDocument(app);
  const UrlDOCS = 'docs'
  SwaggerModule.setup(UrlDOCS, app, document);
  await app.listen(3000);
}

bootstrap();
