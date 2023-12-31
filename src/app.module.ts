import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
})
export class AppModule {}
