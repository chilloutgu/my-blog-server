import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entity/user.entity";
import { UserService } from "src/user/service/user.service";
import { TokenPayload } from "../token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        } 
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: TokenPayload): Promise<User | undefined> {
    return await this.userService.findById(payload.userId);
  }
}