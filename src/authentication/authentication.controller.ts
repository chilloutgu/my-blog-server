import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  @HttpCode(201)
  async signUp() {

  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn() {

  }

}
