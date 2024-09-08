import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { UserRoles } from './../../enums/user-roles.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsInt()
  @Min(18, { message: 'La edad mínima es 18 años.' })
  @Max(100, { message: 'La edad máxima es 100 años.' })
  age: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()  // No obligatorio
  address?: string;

  @IsString()
  //@IsIn(['Admin', 'User', 'Premium'], { message: 'El rol debe ser uno de los siguientes: Admin, User, Premium' }) // Tambien se podrian validar de esta manera los roles!!
  @IsEnum(UserRoles, { message: `Role must be ${UserRoles.Admin}, ${UserRoles.User}, or ${UserRoles.Premium}. Is case sensitive!!` })
  role: string;
}
