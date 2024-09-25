import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import { text } from 'express';
import { join } from 'path';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(text());
  process.env.TZ = 'Africa/Addis_Ababa'; // UTC +03:00
  app.setGlobalPrefix('api');

  app.enableCors();
  const PORT = process.env.PORT || 3000;
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useStaticAssets(join(__dirname, '../..', 'src/.well-known'), {
    prefix: '/.well-known',
    setHeaders: (res, path, stat) => {
      if (path.endsWith('apple-app-site-association')) {
        res.setHeader('Content-Type', 'application/json');
      }
    },
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '../..', 'src/.well-known'), {
    prefix: '/.well-known',
    setHeaders: (res, path, stat) => {
      if (path.endsWith('apple-app-site-association')) {
        res.setHeader('Content-Type', 'application/json');
      }
    },
  });
  await app.listen(PORT);
}
bootstrap();
