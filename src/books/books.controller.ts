import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoles } from 'src/enums/user-roles.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AllBooksQueryDto } from './dto/query.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
@UseGuards(JwtAuthGuard,RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('test')
  @Roles(UserRoles.User)
  test() {
    return 'Probando los fucking roleGuards!!';
  }

  @Get()
  @Roles(UserRoles.Premium)
  findAll(@Query() query: AllBooksQueryDto) {
    return this.booksService.findAll(query);
  }

  @Get('populate')
  @Roles(UserRoles.Admin)
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
