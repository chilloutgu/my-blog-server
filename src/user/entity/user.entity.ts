import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { genHashPassword } from "../util/user.util";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @VersionColumn()
  entityVersion: number;

  @Column({nullable: false, unique: true})
  username: string;

  @Exclude()
  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, unique: true})
  email: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @BeforeInsert()
  private async encryptPassword(): Promise<void> {
    const hashPassword = await genHashPassword(this.password);
    this.password = hashPassword;
  }

  public async changeFromDTO(updateUserDTO: UpdateUserDTO) {
      if(updateUserDTO.hasPassword()) {
        const hashPasword = await genHashPassword(updateUserDTO.getPassword());
        this.password = hashPasword;
      }

      if(updateUserDTO.hasEmail()) {
        this.email = updateUserDTO.getEmail();
      }
  }
}