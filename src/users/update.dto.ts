import { User } from "./users.entity";

export class UpdateUserDTO {
  private readonly id: number;
  private readonly password: string;
  private readonly email: string;

  public constructor(id: number, password: string, email: string) {
    this.id = id;
    this.password = password;
    this.email = email;
  }

  public toEntity(): User {
    const user = new User();
    user.id = this.id;
    user.password = this.password;
    user.email = this.email;

    return user;
  }
}