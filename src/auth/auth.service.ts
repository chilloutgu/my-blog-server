import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(createUserDTO: CreateUserDTO) {
      const newUser = createUserDTO.toEntity();
      const createdUser = await this.userService.create(newUser);
      return createdUser;
  }

  async validateUser(formUsername: string, formPassword: string): Promise<User | undefined> {
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
}
