import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
    ) {}

  async validateUser(formUsername: string, formPassword: string): Promise<User> {
    try {
      const foundUser = await this.userService.findByUsername(formUsername);
      this.validatePassword(formPassword, foundUser.getPassword());
      /* we found that user! */
      return foundUser;
    } catch(error) {
      /* cannot found user by username */
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async validatePassword(plainPassword: string, hashPassword: string): Promise<void> {
    const isMatch = await bcrypt.compare(plainPassword, hashPassword);

    if(!isMatch) {
      /* equal exception wtih above exception */
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  getCookieWithJwtToken(userId: string) {
    /* create token just as userId */
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    
    /* make cookie and return it */
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>('JWT_EXPIRATION_TIME')}`;
  }
}
