import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    {
      provide: DatabaseService,
      useValue: new DatabaseService({
        client: 'mysql2',
        connection: {
          host: 'localhost',
          port: Number(process.env.DATABASE_PORT),
          user: 'root',
          password: process.env.DATABASE_PASS,
          database: 'test',
        },
        pool: {
          min: 2,
          max: 50,
        },
      }),
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
