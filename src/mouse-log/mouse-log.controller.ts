import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { MouseLogService } from './mouse-log.service'; 

@Controller()
export class MouseLogController {
  constructor(private readonly mouseLogService: MouseLogService) {}

  
  @MessagePattern('mouse-log')
  async handleMouseLog(@Payload() data: any, @Ctx() context: KafkaContext) {
    const topic = context.getTopic();
    console.log(`[Kafka - ${topic}] Mouse data received:`, data);
    
    await this.mouseLogService.logToMongo(data);
  }
}
