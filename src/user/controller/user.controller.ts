import { Controller, Get, Patch, Post, Delete, Body, Param, ParseIntPipe, HttpCode, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    const newUser = createUserDTO.toEntity();
    await this.userService.create(newUser);
  }

  @Get()
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<User[] | undefined> {
      return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('id') id: number): Promise<User | undefined> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  public async modify(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO):Promise<void> {
    await this.userService.modify(id, updateUserDTO);
  }

  @Delete(':id')
  @HttpCode(200) 
  public async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
