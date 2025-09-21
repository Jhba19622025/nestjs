import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD|| "gab97dan99",
    database: process.env.DB_NAME,
    entities: [Customer],
    // autoLoadEntities: true,
    synchronize: true
    }),
    CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
