import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { LocalStrategy } from './local.strategy';

@Module({ 
  imports: [PassportModule, UsersModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, LocalAuthenticationGuard]
})
export class AuthenticationModule {}
