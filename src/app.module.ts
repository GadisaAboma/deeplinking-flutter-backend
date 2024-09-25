import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(__dirname);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/.well-known'),
      serveRoot: '/.well-known',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
