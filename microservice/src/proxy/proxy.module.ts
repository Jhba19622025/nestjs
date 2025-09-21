import { Module } from '@nestjs/common';
import { ExternalCustomerModule } from 'src/external-customer/external-customer-module.module';
import { ProxyController } from './proxy.controller';


@Module({
  imports: [ExternalCustomerModule],
  controllers: [ProxyController],
})
export class ProxyModule {}
