import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class AllBooksQueryDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number) // Especifica que debe transformarse a Number
    autorId?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    editorialId?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    generoId?: number;
}
