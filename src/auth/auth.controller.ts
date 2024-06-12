import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginDTO, RegisterDTO } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDTO): Promise<User> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDTO): Promise<any> {
    return this.authService.login(body);
  }
}
