import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ExternalCustomerService } from './external-customer.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        baseURL: cfg.get<string>('CUSTOMER_API_BASE_URL', 'http://localhost:8095'),
        timeout: Number(cfg.get('HTTP_TIMEOUT_MS', '5000')),
        maxRedirects: 0,
      }),
    }),
  ],
  providers: [ExternalCustomerService],
  exports: [ExternalCustomerService],
})
export class ExternalCustomerModule {}
