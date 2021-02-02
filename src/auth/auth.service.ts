import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}


  async signUp() {
    
  }


  async validateUser(formUsername: string, formPassword: string): Promise<User | undefined> {
    const foundUser = await this.userService.findByUsername(formUsername);
    
    if(foundUser && foundUser.getPassword() === formPassword) {
      foundUser.changePasswordNull();

      return foundUser;
    }

    return null;
  }
}
