import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private users: any[] = []; // Simulación de base de datos

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = { ...registerDto, password: hashedPassword };
    this.users.push(user);
    return { message: 'Usuario registrado exitosamente' };
  }

  async login(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Credenciales inválidas');
    }
    return { message: 'Inicio de sesión exitoso' };
  }
}