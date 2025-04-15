import { Test, TestingModule } from '@nestjs/testing';
import { MouseLogController } from './mouse-log.controller';
import { MouseLogService } from './mouse-log.service';

describe('MouseLogController', () => {
  let controller: MouseLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MouseLogController],
      providers: [MouseLogService],
    }).compile();

    controller = module.get<MouseLogController>(MouseLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
