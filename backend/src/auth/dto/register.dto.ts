export class RegisterDto {
    username: string;
    password: string;
    role: 'paciente' | 'profesional' | 'administrativo';
  }