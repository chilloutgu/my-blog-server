import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(newUser: User): Promise<void> {
    this.validateDuplicateUsername(newUser.getUsername());
    await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async modify(id:string, updateUserDTO: UpdateUserDTO): Promise<void> {
    const foundUser = await this.userRepository.findOne(id);
    await foundUser.changeFromDTO(updateUserDTO);

    await this.userRepository.save(foundUser);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateDuplicateUsername(formUsername: string): Promise<void> {
      const foundUser = await this.userRepository.findOne({
        where: {
          username: formUsername
        }
      });
      if(foundUser) {
        throw new HttpException(`already exist user, username : ${formUsername}`, HttpStatus.NOT_FOUND);
      }
  }
}
