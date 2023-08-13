import { Test, TestingModule } from '@nestjs/testing';
import { KeyPoolService } from './key-pool.service';

describe('KeyPoolService', () => {
  let service: KeyPoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyPoolService],
    }).compile();

    service = module.get<KeyPoolService>(KeyPoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
