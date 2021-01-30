import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateArticleDTO } from '../dto/create-article.dto';
import { UpdateArticleDTO } from '../dto/update-article.dto';
import { Article } from '../entity/article.entity';
import { BlogService } from '../service/blog.service';

@Controller('blogs')
export class BlogController {
  
  constructor(private readonly blogService: BlogService) {}

  @Post()
  public async create(@Body() createArticleDTO: CreateArticleDTO):Promise<void> {
    /* change dto to entity */
    const article = new Article();
    await this.blogService.create(article);
  }

  @Get()
  public async findAll(): Promise<Article[] | undefined> {
    return await this.blogService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string):Promise<Article> | undefined {

    return await this.blogService.findOne(id);
  }

  @Patch(':id')
  public async modify(@Param('id') id: string, @Body() updateArticleDTO: UpdateArticleDTO):Promise<void> {
    await this.blogService.modify(id, updateArticleDTO);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.blogService.remove(id);
  }
}
