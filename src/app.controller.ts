import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('db-check')
  async getDbStatus() {
    return this.appService.getDbStatus();
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }
}
