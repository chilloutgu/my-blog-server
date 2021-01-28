import { IsEmail, IsOptional, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  public toEntity(): User {
    const user = new User();
    user.password = this.password ? this.password : undefined;
    user.email = this.email ? this.email : undefined;

    return user;
  }
}