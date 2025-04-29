import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = []; // Simulación de base de datos

  findAll() {
    return this.users;
  }

  create(user: UserEntity) {
    this.users.push(user);
    return user;
  }
}