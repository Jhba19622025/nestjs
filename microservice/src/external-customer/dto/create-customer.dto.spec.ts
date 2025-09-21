import { CreateCustomerDto } from './create-customer.dto';

describe('CreateCustomer', () => {
  it('should be defined', () => {
    expect(new CreateCustomerDto()).toBeDefined();
  });
});
