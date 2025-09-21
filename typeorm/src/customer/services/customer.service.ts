import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer) private readonly repo: Repository<Customer>) { }


  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {

    try {

      const { password, ...customerData } = createCustomerDto;

      const customer = this.repo.create({
        ...customerData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.repo.save(customer);
      return customer;

    } catch (error) {
      throw new InternalServerErrorException(`Error en Create ${error}`);
    }



  }

  async findAll(): Promise<Customer[]> {

    const customers = await this.repo.find();
    return customers;
  }

  async findOne(id: string): Promise<Customer[]> {

    const customer = await this.repo.findBy({ id });

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {

    const entity = await this.repo.findBy({ id });

    if (!entity) throw new NotFoundException('Customer Not Found')

    return await this.repo.save(updateCustomerDto);


  }

  async deleteById(id: string): Promise<void> {
    const res: DeleteResult = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('User not found');
  }
}
