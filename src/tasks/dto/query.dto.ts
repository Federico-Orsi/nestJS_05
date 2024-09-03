import { IsOptional, IsString } from 'class-validator';

export class HelloTasksQueryDto {
  @IsOptional() // Si los parámetros no son obligatorios
  @IsString()
  show?: string;

  @IsOptional()
  @IsString()
  show2?: string;
}
