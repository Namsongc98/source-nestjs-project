import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
