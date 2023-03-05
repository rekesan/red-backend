import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';

@Injectable()
export class DatabaseService {
  private knex: Knex;

  constructor(config: Knex.Config) {
    this.knex = knex(config);
  }

  connection(tableName: string): Knex.QueryBuilder {
    return this.knex.table(tableName);
  }

  getInstance(): Knex {
    return this.knex;
  }
}
