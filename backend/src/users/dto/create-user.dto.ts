import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['paciente', 'profesional', 'administrativo'], {
    message: 'El rol debe ser paciente, profesional o administrativo',
  })
  role: 'paciente' | 'profesional' | 'administrativo';
}
