import { IsEmail, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class CreateUserDTO {
  @IsString()
  private readonly username: string;
  @IsString()
  private readonly password: string;
  @IsString()
  private readonly name: string;
  @IsEmail()
  private readonly email: string;

  public constructor() {}

  public toEntity(): User {
    const newUser =  User.createFromDTO(this);
    return newUser;
  }

  public getUsername() {
    return this.username;
  }

  public getPassword() {
    return this.password;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }
}