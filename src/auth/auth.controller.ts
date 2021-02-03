import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: RequestWithUser) {
    /* authentication is done by LocalAuthGuard */
    const validatedUser = request.user;
    return validatedUser;
  }
}
