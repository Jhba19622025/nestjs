// path: src/external-customer/external-customer.service.spec.ts
import { Test } from '@nestjs/testing';
import { ExternalCustomerService } from './external-customer.service';
import { HttpService } from '@nestjs/axios';
import { BadGatewayException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('ExternalCustomerService', () => {
  let service: ExternalCustomerService;
  const httpServiceMock: Partial<Record<keyof HttpService, any>> = {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ExternalCustomerService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = moduleRef.get(ExternalCustomerService);
    jest.clearAllMocks();
  });

  // ---------- create (ya validado antes) ----------
  it('create: 200 → retorna data', async () => {
    const dto = {
      name: 'Alice',
      lastName: 'Doe',
      middleName: 'Marie',
      email: 'alice@example.com',
      birthDate: '2010-10-10',
      isActive: true,
      password: 'S3cureP@ss!',
    };
    const upstreamData = { id: 'uuid-1', ...dto };
    (httpServiceMock.post as jest.Mock).mockReturnValue(of({ data: upstreamData }));

    const result = await service.create(dto as any);
    expect(httpServiceMock.post).toHaveBeenCalledWith('/customer', dto);
    expect(result).toEqual(upstreamData);
  });

  it('create: error → BadGatewayException con mensaje upstream', async () => {
    (httpServiceMock.post as jest.Mock).mockReturnValue(
      throwError(() => ({ response: { data: { error: 'upstream-fail' } } })),
    );
    await expect(service.create({} as any)).rejects.toBeInstanceOf(BadGatewayException);
    await service.create({} as any).catch((e) => {
      expect(e.getStatus()).toBe(502);
      expect(e.getResponse()).toEqual({ error: 'upstream-fail' });
    });
  });

  // ---------- findAll ----------
  it('findAll: 200 → retorna array', async () => {
    const upstream = [{ id: '1' }, { id: '2' }];
    (httpServiceMock.get as jest.Mock).mockReturnValue(of({ data: upstream }));

    const result = await service.findAll();
    expect(httpServiceMock.get).toHaveBeenCalledWith('/customer');
    expect(result).toEqual(upstream);
  });

  it('findAll: error → BadGatewayException', async () => {
    (httpServiceMock.get as jest.Mock).mockReturnValue(
      throwError(() => ({ response: { data: { error: 'upstream-fail' } } })),
    );
    await expect(service.findAll()).rejects.toBeInstanceOf(BadGatewayException);
    await service.findAll().catch((e) => {
      expect(e.getStatus()).toBe(502);
      expect(e.getResponse()).toEqual({ error: 'upstream-fail' });
    });
  });

  // ---------- findOne ----------
  it('findOne: 200 → retorna item', async () => {
    const id = 'abc';
    const upstream = { id, name: 'Alice' };
    (httpServiceMock.get as jest.Mock).mockReturnValue(of({ data: upstream }));

    const result = await service.findOne(id);
    expect(httpServiceMock.get).toHaveBeenCalledWith(`/customer/${id}`);
    expect(result).toEqual(upstream);
  });

  it('findOne: error → BadGatewayException', async () => {
    const id = 'missing';
    (httpServiceMock.get as jest.Mock).mockReturnValue(
      throwError(() => ({ response: { data: { error: 'not-found-upstream' } } })),
    );
    await expect(service.findOne(id)).rejects.toBeInstanceOf(BadGatewayException);
    await service.findOne(id).catch((e) => {
      expect(e.getStatus()).toBe(502);
      expect(e.getResponse()).toEqual({ error: 'not-found-upstream' });
    });
  });

  // ---------- update ----------
  it('update: 200 → retorna actualizado', async () => {
    const id = 'u1';
    const dto = { name: 'New' };
    const upstream = { id, name: 'New' };
    (httpServiceMock.patch as jest.Mock).mockReturnValue(of({ data: upstream }));

    const result = await service.update(id, dto as any);
    expect(httpServiceMock.patch).toHaveBeenCalledWith(`/customer/${id}`, dto);
    expect(result).toEqual(upstream);
  });

  it('update: error → BadGatewayException', async () => {
    const id = 'u1';
    (httpServiceMock.patch as jest.Mock).mockReturnValue(
      throwError(() => ({ response: { data: { error: 'update-fail' } } })),
    );
    await expect(service.update(id, {} as any)).rejects.toBeInstanceOf(BadGatewayException);
    await service.update(id, {} as any).catch((e) => {
      expect(e.getStatus()).toBe(502);
      expect(e.getResponse()).toEqual({ error: 'update-fail' });
    });
  });

  // ---------- deleteById ----------
  it('deleteById: 200 → retorna data (p.ej. {deleted:true})', async () => {
    const id = 'd1';
    const upstream = { deleted: true };
    (httpServiceMock.delete as jest.Mock).mockReturnValue(of({ data: upstream }));

    const result = await service.deleteById(id);
    expect(httpServiceMock.delete).toHaveBeenCalledWith(`/customer/${id}`);
    expect(result).toEqual(upstream);
  });

  it('deleteById: error → BadGatewayException', async () => {
    const id = 'd1';
    (httpServiceMock.delete as jest.Mock).mockReturnValue(
      throwError(() => ({ response: { data: { error: 'delete-fail' } } })),
    );
    await expect(service.deleteById(id)).rejects.toBeInstanceOf(BadGatewayException);
    await service.deleteById(id).catch((e) => {
      expect(e.getStatus()).toBe(502);
      expect(e.getResponse()).toEqual({ error: 'delete-fail' });
    });
  });
});
