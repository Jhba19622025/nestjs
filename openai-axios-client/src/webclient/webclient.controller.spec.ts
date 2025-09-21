import { Test, TestingModule } from '@nestjs/testing';
import { WebclientController } from './webclient.controller';
import { WebclientService } from './webclient.service';

describe('WebclientController', () => {
  let controller: WebclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebclientController],
      providers: [WebclientService],
    }).compile();

    controller = module.get<WebclientController>(WebclientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
