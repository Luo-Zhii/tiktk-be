import { Module } from '@nestjs/common';
import { AstraService } from './astra.service';
import { AstraController } from './astra.controller';

@Module({
  controllers: [AstraController],
  providers: [AstraService],
  exports: [AstraService],
})
export class AstraModule {}