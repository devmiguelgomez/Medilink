export class UserEntity {
    id?: number;
    name: string;
    role: 'paciente' | 'profesional' | 'administrativo';
  }