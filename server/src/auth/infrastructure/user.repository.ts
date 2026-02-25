import { Injectable } from '@nestjs/common';
import { User } from '../domain/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../domain/interface/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private users: User[] = [];

  constructor() {
    const hash = bcrypt.hashSync('123456', 10);
    this.users.push(
      new User('1', 'admin@example.com', hash, 'admin'),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
}