import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @IsNotEmpty()
  autorId: number;  // ID que refiere a la tabla de autores

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  generoIds: number[];  // IDs que refieren a la tabla de géneros (puede tener más de uno)

  @IsInt()
  @IsNotEmpty()
  editorialId: number;  // ID que refiere a la tabla de editoriales

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  fechaDePublicacion: Date;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
