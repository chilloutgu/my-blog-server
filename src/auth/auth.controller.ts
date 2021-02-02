import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  async signUp() {

  }

  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signIn() {

  }

}
