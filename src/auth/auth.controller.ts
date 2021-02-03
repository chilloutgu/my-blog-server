import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: RequestWithUser, @Res() response: Response) {
    /* authentication is done by LocalAuthGuard */
    const validatedUser = request.user;
    const cookie = this.authService.getCookieWithJwtToken(validatedUser.getId());
    response.setHeader('Set-Cookie', cookie);

    return response.send(validatedUser);
  }
}
