import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';

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
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, saltOrRounds);
    this.password = hashPassword;
  }
}