import { Injectable } from '@nestjs/common';
import { Pool } from "pg";
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

const pool = new Pool ({
  host: "localhost",
  user: 'postgres',
  password: 'eldiego10',
  database: 'nest.js',
})

@Injectable()
export class BooksService {

async create(createBookDto: CreateBookDto) {

    const {
      titulo,
      descripcion,
      autorId,
      fechaDePublicacion,
      precio,
      generoIds,
      editorialId,
    } = createBookDto;

    // Insertar el libro
    const queryInsertBook = `
      INSERT INTO Books (titulo, descripcion, fechaDePublicacion, precio, autorId, editorialId)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const valuesInsertBook = [titulo, descripcion, fechaDePublicacion, precio, autorId, editorialId];
    let bookId: number;

    try {
      const resultBook = await pool.query(queryInsertBook, valuesInsertBook);
      bookId = resultBook.rows[0].id;
    } catch (error) {
      console.error('Error inserting book:', error);
      throw error;
    }

    // Insertar los géneros en la tabla intermedia
    const queryInsertGenres = `
      INSERT INTO Books_Generos (bookId, generoId)
      VALUES
      ${generoIds.map((_, index) => `($1, $${index + 2})`).join(', ')}
    `;
    const valuesInsertGenres = [bookId, ...generoIds];

    try {
      await pool.query(queryInsertGenres, valuesInsertGenres);
      return { id: bookId, message: 'Book created successfully' };
    } catch (error) {
      console.error('Error inserting genres:', error);
      throw error;
    }
  }




  async findAll() {

    try {
      const allBooks = await pool.query('SELECT * FROM books')
      console.log(allBooks.rows);
      return (allBooks.rows)

     } catch (error) { console.log(error) }

  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
