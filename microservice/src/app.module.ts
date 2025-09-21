import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalCustomerModule } from './external-customer/external-customer-module.module';
import { ProxyModule } from './proxy/proxy.module';

 


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExternalCustomerModule,
    ProxyModule
  
    
  ],
})
export class AppModule {}
