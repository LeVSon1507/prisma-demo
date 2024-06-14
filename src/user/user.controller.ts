import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(
    @Query('take', ParseIntPipe) take = 10,
    @Query('skip', ParseIntPipe) skip = 0,
  ): Promise<User[]> {
    return this.userService.findAll(take, skip);
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    console.log('create user api-> ', body);
    return this.userService.create(body);
  }
}
