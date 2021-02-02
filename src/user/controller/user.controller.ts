import { Controller, Get, Patch, Post, Delete, Body, Param, ParseIntPipe, HttpCode, ClassSerializerInterceptor, UseInterceptors, HttpStatus } from '@nestjs/common';
import { ApiResponse, ResponseMessage } from 'src/shared/object/api.object';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() createUserDTO: CreateUserDTO): Promise<ApiResponse> {
    const newUser = createUserDTO.toEntity();
    await this.userService.create(newUser);
    return new ApiResponse(HttpStatus.CREATED, ResponseMessage.SUCCESS);
  }

  @Get()
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<ApiResponse<User[]>> {
      const foundUsers = await this.userService.findAll();
      return new ApiResponse<User[]>(HttpStatus.OK, ResponseMessage.SUCCESS)
        .setData(foundUsers);
  }

  @Get(':id')
  @HttpCode(200)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param('username') username: string): Promise<ApiResponse<User>> {
    const foundUser = await this.userService.findByUsername(username);
    return new ApiResponse<User>(HttpStatus.OK, ResponseMessage.SUCCESS)
      .setData(foundUser);
  }

  @Patch(':id')
  @HttpCode(200)
  public async modify(@Param('username') username: string, @Body() updateUserDTO: UpdateUserDTO): Promise<ApiResponse> {
    await this.userService.modify(username, updateUserDTO);
    return new ApiResponse(HttpStatus.OK, ResponseMessage.SUCCESS);
  }

  @Delete(':id')
  @HttpCode(200) 
  public async remove(@Param('username') username: string): Promise<ApiResponse> {
    await this.userService.remove(username);
    return new ApiResponse(HttpStatus.OK, ResponseMessage.SUCCESS);
  }
}
