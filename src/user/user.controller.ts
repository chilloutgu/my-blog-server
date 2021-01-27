import { Controller, Get, Patch, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './create.dto';
import { UpdateUserDTO } from './update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() user: User): Promise<void> {
    await this.userService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
      return await this.userService.findAll();
  }

  @Get(':id') 
  public async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch(':id') 
  public async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDTO: UpdateUserDTO):Promise<void> {
    const user = updateUserDTO.toEntity();
    await this.userService.update(user);
  }

  @Delete(':id') 
  public async delete(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
