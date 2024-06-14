import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async findAll(take: number = 10, skip: number = 0): Promise<User[]> {
    const users = await this.prismaService.user.findMany({ skip, take });

    if (users.length === 0) {
      throw new HttpException(
        { message: 'No user found.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return users;
  }

  async create(body: CreateUserDto): Promise<User> {
    //step 1: checking email has already exist
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      throw new HttpException(
        { message: 'This email has been used.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    //step 2: hash password and store to DB
    const hashPassword = await hash(body.password, 10);
    const result = await this.prismaService.user.create({
      data: { ...body, password: hashPassword },
    });

    return result;
  }
}
