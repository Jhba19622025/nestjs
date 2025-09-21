import { Module } from '@nestjs/common';
import { WebclientModule } from './webclient/webclient.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WebclientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
