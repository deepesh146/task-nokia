import { Controller, Get } from '@nestjs/common';

@Controller('api/testing')
export class TestController {
  @Get()
  getTestMessage(): string {
    return 'This is a test message.';
  }
}
