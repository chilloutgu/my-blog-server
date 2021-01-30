import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ResponseMessage } from 'src/shared/object/api.object';
import { CreateArticleDTO } from '../dto/create-article.dto';
import { UpdateArticleDTO } from '../dto/update-article.dto';
import { Article } from '../entity/article.entity';
import { BlogService } from '../service/blog.service';

@Controller('blogs')
export class BlogController {
  
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @HttpCode(202)
  public async create(@Body() createArticleDTO: CreateArticleDTO):Promise<ApiResponse<Article>> {
    const newArticle = createArticleDTO.toEntity();
    await this.blogService.create(newArticle);
    return new ApiResponse<Article>(HttpStatus.CREATED, ResponseMessage.SUCCESS);
  }

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<ApiResponse<Article[]>> {
    const foundArticles = await this.blogService.findAll();
    return new ApiResponse<Article[]>(HttpStatus.OK, ResponseMessage.SUCCESS)
      .setData(foundArticles);
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(@Param('id') id: string):Promise<ApiResponse<Article>> {
    const foundArticle = await this.blogService.findOne(id);
    return new ApiResponse<Article>(HttpStatus.OK, ResponseMessage.SUCCESS)
      .setData(foundArticle);
  }

  @Patch(':id')
  @HttpCode(200)
  public async modify(@Param('id') id: string, @Body() updateArticleDTO: UpdateArticleDTO):Promise<ApiResponse<Article>> {
    await this.blogService.modify(id, updateArticleDTO);
    return new ApiResponse(HttpStatus.OK, ResponseMessage.SUCCESS);
  }

  @Delete(':id')
  @HttpCode(200)
  public async remove(@Param('id') id: string): Promise<ApiResponse<Article>> {
    await this.blogService.remove(id);
    return new ApiResponse(HttpStatus.OK, ResponseMessage.SUCCESS);
  }
}
