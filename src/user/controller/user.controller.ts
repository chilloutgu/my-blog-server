import { Controller, Get, Patch, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    const user = createUserDTO.toEntity();
    await this.userService.create(user);
  }

  @Get()
  public async findAll(): Promise<User[]> {
      return await this.userService.findAll();
  }

  @Get(':id') 
  public async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch(':id') 
  public async update(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO):Promise<void> {
    const user = updateUserDTO.toEntity();
    user.id = id;
    await this.userService.update(user);
  }

  @Delete(':id') 
  public async delete(@Param('id') id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
