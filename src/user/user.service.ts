import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Knex } from 'knex';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  private dbInstance: Knex;
  constructor(private db: DatabaseService) {
    this.dbInstance = this.db.getInstance();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const lastId = await this.db
      .connection('user')
      .insert(createUserDto)
      .then((rows) => rows[0]);
    return await this.db
      .connection('user')
      .select()
      .where({ id: lastId })
      .then((rows) => rows[0]);
  }

  async findAll(): Promise<User[]> {
    return await this.db
      .connection('user')
      .select('id', 'firstName', 'lastName')
      .orderBy('id');
  }

  async findOne(id: number): Promise<User> {
    const user = await this.db
      .connection('user')
      .select()
      .where({ id })
      .then((rows) => rows[0]);
    return user;
  }

  async remove(id: number) {
    return await this.db.connection('user').delete().where({ id });
  }
}
