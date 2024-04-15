import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser() {
    const newUser = await this.prismaService.user.create({
      data: { name: 'Mark', email: 'mark@gmail.com', clerkid: '123' },
    });
    if (!newUser) {
      throw new Error('Failed to create user');
    }
    return newUser;
  }
}
