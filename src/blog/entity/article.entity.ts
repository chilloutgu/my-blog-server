import { UserId } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { CreateArticleDTO } from "../dto/create-article.dto";
import { UpdateArticleDTO } from "../dto/update-article.dto";
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

  @Column(type => UserId, {prefix: false})
  private userId: UserId;

  @CreateDateColumn({name: 'create_date'})
  private createDate: Date;

  @UpdateDateColumn({name: 'update_date'})
  private updtaeDate: Date;

  private constructor(title: string, description: string, userId: UserId) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }

  public static createFromDTO(createArticleDTO: CreateArticleDTO): Article {
    return new Article(createArticleDTO.getTitle(), createArticleDTO.getDescription(), createArticleDTO.getUserId());
  }

  public changeFromDTO(updateArticleDTO: UpdateArticleDTO): void {
    if(updateArticleDTO.hasTitle()) {
      this.title = updateArticleDTO.getTitle();
    }

    if(updateArticleDTO.hasDescription()) {
      this.description = updateArticleDTO.getDescription();
    }
  }
}