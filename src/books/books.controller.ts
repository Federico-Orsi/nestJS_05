import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { AllBooksQueryDto } from './dto/query.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(@Query() query: AllBooksQueryDto) {
    return this.booksService.findAll(query);
  }

  @Get('populate')
  populate_books() {
    return this.booksService.populate_books();
  }

  @Get(':id')
  findByBook(@Param('id') id: string) {
    return this.booksService.findOne(+id); // el "+" convierte el string a numero!! Recordar que en las Solicitudes HTTP todos los datos nos llegan en formato string (incluidos los IDs)
  }

  @Get('author/:id')
  findByAuthor(@Param('id') id: string) {
    return this.booksService.findByAuthor(+id);
  }

  @Get('editorial/:id')
  findByEditorial(@Param('id') id: string) {
    return this.booksService.findByEditorial(+id);
  }

  @Get('genero/:id')
  findByGenero(@Param('id') id: string) {
    return this.booksService.findByGenero(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
