import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors for the Vite frontend dev server
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // all routes prefixed with /api here
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('firas-backend running on http://localhost:3001');
}

bootstrap();
