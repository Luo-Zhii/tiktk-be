import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Controller('mouse-event')
export class AppController implements OnModuleInit {
  constructor(
    @Inject('MOUSE_LOG_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('mouse-log');
    await this.client.connect();
  }

  @Post()
  async logMouse(@Body() data: any) {
    console.log('📤 Gửi Kafka:', data);
    return this.client.send('mouse-log', data);
  }
}
