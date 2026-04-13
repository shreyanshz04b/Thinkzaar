import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  // Basic validation pipe, though Zod is preferred per request
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
