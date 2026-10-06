import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDbStatus() {
    return this.dataSource.query('SELECT 1 as ok');
  }

  async getUsers() {
    return this.dataSource.query('SELECT * FROM users LIMIT 10');
  }
}
