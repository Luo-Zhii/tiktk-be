import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';

@Controller()
export class MouseLogController {
  @MessagePattern('mouse-log')
  async handleMouseLog(@Payload() data: any, @Ctx() context: KafkaContext) {
    const topic = context.getTopic();
    console.log(`📥 [Kafka - ${topic}] Mouse data received:`, data);

    // TODO: Ghi log ra file, hoặc đẩy vào HDFS sau này
  }
}
  