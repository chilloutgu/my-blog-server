import { IsEmail, IsOptional, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  private readonly password?: string;

  @IsOptional()
  @IsEmail()
  private readonly email?: string;

  public getPassword() {
    return this.password;
  }

  public getEmail() {
    return this.email;
  }

  public hasPassword(): boolean {
    return this.password ? true : false;
  }

  public hasEmail(): boolean {
    return this.email ? true: false;
  }
}