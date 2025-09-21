import { Module } from '@nestjs/common';
import { WebclientService } from './webclient.service';
import { WebclientController } from './webclient.controller';

@Module({
  controllers: [WebclientController],
  providers: [WebclientService],
})
export class WebclientModule {}
