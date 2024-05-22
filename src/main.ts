import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const swaggerPath = '/docs'
const swaggerCDN = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.7.2'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Jobify Master')
    .setDescription('Documentation')
    .setVersion('1.0')
    .addTag('Version 1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document, {
    customCssUrl: [`${swaggerCDN}/swagger-ui.css`],
    customJs: [
      `${swaggerCDN}/swagger-ui-bundle.js`,
      `${swaggerCDN}/swagger-ui-standalone-preset.js`
    ]
  })
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
