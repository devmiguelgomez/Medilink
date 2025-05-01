import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
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

  @IsOptional() // Hacemos el campo opcional
  @IsEnum(['paciente', 'profesional', 'administrativo'], {
    message: 'El rol debe ser paciente, profesional o administrativo',
  })
  role: 'paciente' | 'profesional' | 'administrativo' = 'paciente'; // Valor por defecto
}