import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MouseLogService } from './mouse-log.service';
import { MouseLogController } from './mouse-log.controller';
import { MouseLog, MouseLogSchema } from './schema/mouse-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MouseLog.name, schema: MouseLogSchema }]),
  ],
  controllers: [MouseLogController],
  providers: [MouseLogService],
  exports: [MouseLogService, MouseLogService],  // Xuất MouseLogService nếu cần sử dụng ở nơi khác
})
export class MouseLogModule {}
