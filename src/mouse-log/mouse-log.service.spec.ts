import { Test, TestingModule } from '@nestjs/testing';
import { MouseLogService } from './mouse-log.service';

describe('MouseLogService', () => {
  let service: MouseLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MouseLogService],
    }).compile();

    service = module.get<MouseLogService>(MouseLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
