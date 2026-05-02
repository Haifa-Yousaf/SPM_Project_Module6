import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  ENABLE CORS (for React frontend)
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  //  ensure uploads folder exists
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }

  // serve uploaded files
  app.use('/uploads', express.static('uploads'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();