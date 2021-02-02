import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { User } from '../entity/user.entity';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(newUser: User): Promise<User> {
    this.validateDuplicateUsername(newUser.getUsername());
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findByUsername(formUsername: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        username: formUsername
      }
    });
  }
  
  async modify(username: string, updateUserDTO: UpdateUserDTO): Promise<void> {
    const foundUser = await this.userRepository.findOne(username);
    await foundUser.changeFromDTO(updateUserDTO);

    await this.userRepository.save(foundUser);
  }
  
  async remove(username: string): Promise<void> {
    await this.userRepository.delete(username);
  }

  private async validateDuplicateUsername(username: string): Promise<void> {
      const foundUser = await this.userRepository.findOne(username);
      if(foundUser) {
        throw new HttpException(`already exist user, username : ${username}`, HttpStatus.NOT_FOUND);
      }
  }
}
