import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Writer } from "./writer.entity";

@Entity()
export class Article {
  
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @VersionColumn({name: 'version'})
  private version: number;
  
  @Column()
  private title: string;
    
  @Column()
  private description: string;

  @Column(type => Writer, {prefix: false})
  private writer: Writer;

  @CreateDateColumn({name: 'create_date'})
  private createDate: Date;

  @UpdateDateColumn({name: 'update_date'})
  private updtaeDate: Date;
}