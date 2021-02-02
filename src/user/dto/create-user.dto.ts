import { IsEmail, IsString } from "class-validator";
import { User } from "../entity/user.entity";

export class CreateUserDTO {
 
  @IsEmail()
  private readonly username: string;
 
  @IsString()
  private readonly password: string;
 
  @IsString()
  private readonly name: string;


  public toEntity(): User {
    const newUser =  User.createFromDTO(this);
    return newUser;
  }

  public getUsername() { return this.username; }

  public getPassword() { return this.password; }
  
  public getName() { return this.name; }
}