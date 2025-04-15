import { Controller, Post, Body } from '@nestjs/common';
import { AstraService } from './astra.service';

@Controller('astra')
export class AstraController {
  constructor(private readonly astraService: AstraService) {}

  @Post('log')
  async logUserAction(@Body() log: any) {
    return this.astraService.insertLog('user_behavior', log);
  }
}
