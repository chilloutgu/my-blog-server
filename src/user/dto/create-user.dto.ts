import { IsEmail, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class CreateUserDTO {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;

  public toEntity(): User {
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    user.name = this.name;
    user.email = this.email;
    
    return user;
  }
}