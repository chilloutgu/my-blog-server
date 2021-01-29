import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(newUser: User): Promise<void> {
    this.validateDuplicateUsername(newUser.username);
    await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async update(user: User): Promise<void> {
    const foundUser = await this.userRepository.findOne(user.id);
    foundUser.password = user.password ? user.password : foundUser.password;
    foundUser.email = user.email ? user.email : foundUser.email;

    await this.userRepository.save(foundUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async validateDuplicateUsername(formUsername: string): Promise<void> {
      const foundUser = await this.userRepository.findOne({username: formUsername});
      if(foundUser != undefined) {
        throw new Error(`already exist user, username : ${formUsername}`);
      }
  }
}