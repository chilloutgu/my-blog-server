import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateArticleDTO } from '../dto/update-article.dto';
import { Article } from '../entity/article.entity';

@Injectable()
export class BlogService {

  constructor(@InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  public async create(newArticle: Article): Promise<void> {
    await this.articleRepository.save(newArticle);
  }

  public async findAll(): Promise<Article[] | undefined> {
    return await this.articleRepository.find();
  }

  public async findOne(id: string): Promise<Article | undefined> {
    return await this.articleRepository.findOne(id);
  }


  public async modify(id: string, updateArticleDTO: UpdateArticleDTO): Promise<void> {
    const foundArticle = await this.articleRepository.findOne(id);
    foundArticle.changeFromDTO(updateArticleDTO);
    
    await this.articleRepository.save(foundArticle);
  }

  public async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
