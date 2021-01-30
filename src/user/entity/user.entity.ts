import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { genHashPassword } from "../util/user.util";
import { CreateUserDTO } from "../dto/create-user.dto";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  private readonly id: string;

  @VersionColumn({name: 'version'})
  private readonly version: number;

  @Column({nullable: false, unique: true})
  private readonly username: string;

  @Exclude()
  @Column({nullable: false})
  private password: string;

  @Column({nullable: false})
  private readonly name: string;

  @Column({nullable: false, unique: true})
  private email: string;

  @CreateDateColumn({name: "create_date"})
  private createDate: Date;

  @UpdateDateColumn({name: "update_date"})
  private updateDate: Date;

  @BeforeInsert()
  private async encryptPassword(): Promise<void> {
    const hashPassword = await genHashPassword(this.password);
    this.password = hashPassword;
  }
  
  private constructor(username: string, password: string, name: string, email: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
  }

  public static createFromDTO(createUserDTO: CreateUserDTO): User {
    return new User(createUserDTO.getUsername(), createUserDTO.getPassword(), createUserDTO.getName(), createUserDTO.getEmail());
  }

  public async changeFromDTO(updateUserDTO: UpdateUserDTO): Promise<void> {
      if(updateUserDTO.hasPassword()) {
        const hashPasword = await genHashPassword(updateUserDTO.getPassword());
        this.password = hashPasword;
      }

      if(updateUserDTO.hasEmail()) {
        this.email = updateUserDTO.getEmail();
      }
  }
  
  public getUsername() {
    return this.username;
  }
}


export class UserId {
  @Column({name: 'user_id', nullable: false, length: 36})
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}