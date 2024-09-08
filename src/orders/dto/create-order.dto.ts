import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsDateString()
  orderDate?: Date;

  @IsOptional()
  @IsString()
  status?: string = 'in progress...';

  @IsNotEmpty()
  @IsArray()
  purchased_books: OrderBookDto[];
}

export class OrderBookDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

