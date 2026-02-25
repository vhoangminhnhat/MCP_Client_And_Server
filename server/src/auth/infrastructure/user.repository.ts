import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/entity/user.entity';
import { IUserRepository } from '../domain/interface/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.password, user.role);
  }
}
