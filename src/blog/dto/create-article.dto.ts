import { IsString } from "class-validator";
import { UserId } from "src/user/entity/user.entity";
import { Article } from "../entity/article.entity";

export class CreateArticleDTO {
  
  @IsString()
  private readonly title: string;
  
  @IsString()
  private readonly description: string;
  
  @IsString()
  private readonly userId: string;

  public toEntity():Article {
    const newArticle = Article.createFromDTO(this);
    return newArticle;
  }

  public getTitle(): string { return this.title; }

  public getDescription(): string { return this.description; }

  public getUserId(): UserId { return new UserId(this.userId); }
}