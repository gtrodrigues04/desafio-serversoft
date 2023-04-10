import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data) {
    const user = await this.findOneOrFail({ id });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ id });
    this.usersRepository.softDelete({ id });
  }
}
