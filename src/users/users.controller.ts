import { Controller, Get, Patch, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './create.dto';
import { UpdateUserDTO } from './update.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() user: User): Promise<void> {
    await this.usersService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
      return await this.usersService.findAll();
  }

  @Get(':id') 
  public async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id') 
  public async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDTO: UpdateUserDTO):Promise<void> {
    const user = updateUserDTO.toEntity();
    await this.usersService.update(user);
  }

  @Delete(':id') 
  public async delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
