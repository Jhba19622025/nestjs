import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExternalCustomerService } from '../external-customer/external-customer.service';
import { CreateCustomerDto } from '../external-customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../external-customer/dto/update-customer.dto';
 
import {
  customerCreatedEx,
  customerPayloadEx,
  customerSingleEx,
  customersListEx,
  deleteOkEx,
} from '../common/swaggger/examples';
import { ApiProxyDefaultErrors } from 'src/common/swaggger/proxy-errors';
import { CustomerResponseDto } from 'src/external-customer/dto/customer-response-dto';

@ApiTags('proxy')
@Controller('proxy')
export class ProxyController {
  constructor(private readonly external: ExternalCustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Proxy → Create Customer' })
  @ApiBody({ description: 'Customer to create', examples: { sample: customerPayloadEx() } })
  @ApiCreatedResponse({ description: 'Customer created', type: CustomerResponseDto, examples: { created: customerCreatedEx() } })
  @ApiProxyDefaultErrors()
  create(@Body() dto: CreateCustomerDto) {
    return this.external.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Proxy → Find All Customers' })
  @ApiOkResponse({ description: 'Customers list', isArray: true, type: CustomerResponseDto, examples: { ok: customersListEx() } })
  @ApiProxyDefaultErrors()
  findAll() {
    return this.external.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Proxy → Find Customer by Id' })
  @ApiParam({ name: 'id', example: 'a3f6b4fe-1234-4a1b-9f00-abc123def456' })
  @ApiOkResponse({ description: 'Customer found', type: CustomerResponseDto, examples: { ok: customerSingleEx() } })
  @ApiProxyDefaultErrors()
  findOne(@Param('id') id: string) {
    return this.external.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Proxy → Update Customer by Id' })
  @ApiParam({ name: 'id', example: 'a3f6b4fe-1234-4a1b-9f00-abc123def456' })
  @ApiOkResponse({ description: 'Customer updated', type: CustomerResponseDto, examples: { ok: customerSingleEx() } })
  @ApiProxyDefaultErrors()
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.external.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Proxy → Delete Customer by Id' })
  @ApiParam({ name: 'id', example: 'a3f6b4fe-1234-4a1b-9f00-abc123def456' })
  @ApiOkResponse({ description: 'Customer deleted', examples: { ok: deleteOkEx() } })
  @ApiProxyDefaultErrors()
  remove(@Param('id') id: string) {
    return this.external.deleteById(id);
  }
}
