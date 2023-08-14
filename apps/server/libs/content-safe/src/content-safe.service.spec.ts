import { Test, TestingModule } from '@nestjs/testing';
import { ContentSafeService } from './content-safe.service';

describe('ContentSafeService', () => {
  let service: ContentSafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentSafeService],
    }).compile();

    service = module.get<ContentSafeService>(ContentSafeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
