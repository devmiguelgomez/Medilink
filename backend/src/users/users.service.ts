import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'; '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(role?: 'paciente' | 'profesional' | 'administrativo'): Promise<UserEntity[]> {
    if (role) {
      return await this.usersRepository.find({ where: { role } });
    }
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

async create(createUserDto: CreateUserDto): Promise<UserEntity> {
  const existingUser = await this.findByEmail(createUserDto.email);
  if (existingUser) {
    throw new ConflictException('El usuario con este correo ya existe');
  }
  const user = this.usersRepository.create(createUserDto);
  return await this.usersRepository.save(user);
}

  async update(id: number, updateUserDto: Partial<UserEntity>): Promise<UserEntity> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}