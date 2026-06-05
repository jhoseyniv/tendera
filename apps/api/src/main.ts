import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AIExceptionFilter } from './common/filters/ai-exception.filter';

async function bootstrap() {

  const app =

    await NestFactory.create(
      AppModule
    );

  app.enableCors();

  app.useGlobalFilters(

    new AIExceptionFilter()
  );

  await app.listen(

    process.env.PORT ?? 3001
  );
}

bootstrap();

console.log(
  'BOOTSTRAP OK'
);