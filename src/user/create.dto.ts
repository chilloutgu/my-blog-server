import { User } from "./user.entity";

export class CreateUserDTO {
  username: string;
  password: string;
  name: string;
  email: string;

  public constructor(username: string, password: string, name: string, email: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
  }

  public toEntity(): User {
    const user = new User();
    user.username = this.username;
    user.password = this.password;
    user.name = this.name;
    user.email = this.email;
    
    return user;
  }
}