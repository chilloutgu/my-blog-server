import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async update(user: User): Promise<void> {
    const foundUser = await this.userRepository.findOne(user.id);
    foundUser.password = user.password;
    foundUser.email = user.email;

    await this.userRepository.save(foundUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
