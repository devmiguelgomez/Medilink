import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.usersService.findByEmail(registerDto.email);
      if (existingUser) {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }

      console.log('Creando usuario con datos:', registerDto);
      
      // Crear un nuevo usuario con rol predeterminado si no se especifica
      const userData = {
        ...registerDto,
        role: registerDto.role || 'paciente' // Asegurar que siempre hay un rol
      };
      
      const newUser = await this.usersService.create(userData);
      
      return {
        message: 'Usuario registrado exitosamente',
        user: newUser,
      };
    } catch (error) {
      console.error('Error en registro:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al registrar usuario: ' + (error.message || error));
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear un payload para el JWT
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}