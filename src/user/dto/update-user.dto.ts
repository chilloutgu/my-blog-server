import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  private readonly password?: string;

  @IsOptional()
  @IsEmail()
  private readonly email?: string;

  public getPassword(): string {
    if(this.password) {
      return this.password;
    } else {
      throw new Error('password is undefined, you cannot get password for update');
    }
  }

  public getEmail(): string {
    if(this.email) {
      return this.email;
    } else {
      throw new Error('email is undefined, you cannot get password for update');
    }
  }

  public hasPassword(): boolean { return this.password ? true : false; }

  public hasEmail(): boolean { return this.email ? true: false; }
}