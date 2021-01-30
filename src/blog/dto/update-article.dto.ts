import { IsOptional, IsString } from "class-validator";

  export class UpdateArticleDTO {
    
    @IsOptional()
    @IsString()
    private readonly title?: string;

    @IsOptional()
    @IsString()
    private readonly description?: string;

    public getTitle(): string {
      if(this.title) {
        return this.title;
      } else {
        throw new Error('title is undefined, you cannot get title for update');
      }
    }

    public getDescription(): string {
      if(this.description) {
        return this.description;
      } else {
        throw new Error('description is undefined, you cannot get undefined for update');
      }
    }
    public hasTitle(): boolean { return this.title ? true : false; }

    public hasDescription(): boolean { return this.description ? true : false; }
  }