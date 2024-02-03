import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3031);
  } catch (error) {
    console.error('An error occurred during application startup:', error);
  }
}

bootstrap();

