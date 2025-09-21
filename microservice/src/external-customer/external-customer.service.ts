import { Injectable, BadGatewayException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class ExternalCustomerService {
  constructor(private readonly http: HttpService) {}

  async create(dto: CreateCustomerDto) {
    try {
      const res = await firstValueFrom(this.http.post('/customer', dto));
      return res.data;
    } catch (e: any) {
      throw new BadGatewayException(e?.response?.data ?? 'Upstream error');
    }
  }

  async findAll() {
    try {
      const res = await firstValueFrom(this.http.get('/customer'));
      return res.data;
    } catch (e: any) {
      throw new BadGatewayException(e?.response?.data ?? 'Upstream error');
    }
  }

  async findOne(id: string) {
    try {
      const res = await firstValueFrom(this.http.get(`/customer/${id}`));
      return res.data;
    } catch (e: any) {
      throw new BadGatewayException(e?.response?.data ?? 'Upstream error');
    }
  }

  async update(id: string, dto: UpdateCustomerDto) {
    try {
      const res = await firstValueFrom(this.http.patch(`/customer/${id}`, dto));
      return res.data;
    } catch (e: any) {
      throw new BadGatewayException(e?.response?.data ?? 'Upstream error');
    }
  }

  async deleteById(id: string) {
    try {
      const res = await firstValueFrom(this.http.delete(`/customer/${id}`));
      return res.data;
    } catch (e: any) {
      throw new BadGatewayException(e?.response?.data ?? 'Upstream error');
    }
  }
}