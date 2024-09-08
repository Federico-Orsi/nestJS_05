import { Injectable } from '@nestjs/common';
import { Pool } from "pg";
import { CreateBookDto } from './dto/create-book.dto';
import { AllBooksQueryDto } from './dto/query.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// const pool = new Pool ({
//   host: process.env.POSTGRES_HOST,
//   user: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DB,
//   port: parseInt(process.env.POSTGRES_PORT)
// }) // esta es la conexion a la DB remota en Render!!

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

    const placeholders = generoIds.map((_, index) => `$${index + 1}`).join(', ');
    // chequeo si los generoIDs existen!!
    const query = `
      SELECT id
      FROM genero
      WHERE id IN (${placeholders})
    `;

    const result = await pool.query(query, generoIds);

    if (result.rows.length === 0) {
      console.error('Ningún género especificado existe en la base de datos.');
      throw new Error('Géneros no encontrados en la tabla.');
    }

     // Obtengo los IDs encontrados en la tabla
    const foundGeneroIds = result.rows.map(item => item.id);

    // Verifico si todos los generoIDs de la request están en los IDs encontrados en la query
    const missingGeneroIds = generoIds.filter(id => !foundGeneroIds.includes(id));

    if (missingGeneroIds.length > 0) {
      console.error(`Los siguientes géneros no fueron encontrados: ${missingGeneroIds.join(', ')}`);
      throw new Error(`Géneros no encontrados en la tabla: ${missingGeneroIds.join(', ')}`);
    }

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


  async findAll( queries: AllBooksQueryDto) {

    try {

        const { autorId, editorialId, generoId } = queries;

        let querySql = 'SELECT distinct b.* FROM Books b LEFT JOIN Books_Generos bg ON b.id = bg.bookId WHERE 1=1'
        const values = [];
        let paramIndex = 1;

        if (autorId) {
          querySql += ` AND b.autorId = $${paramIndex++}`
          values.push(autorId);
        }

        if (editorialId) {
          querySql += ` AND b.editorialId = $${paramIndex++}`
          values.push(editorialId);
        }

        if (generoId) {
          querySql += ` AND bg.generoId = $${paramIndex++}`
          values.push(generoId);
        }
        console.log(autorId + " autorId print");
        console.log(editorialId + " editorialId print");
        console.log(generoId + " generoId print");

        console.log(querySql + " querySql print");
        console.log(values + " values print");




        const result = await pool.query(querySql, values);
        return result.rows;

     } catch (error) { console.log(error) }
}


//-----------------------
// otra posible alternativa para el findAll con filtros

// const { autorId, editorialId, generoId } = queries;

//       //Construcción de la consulta utilizando COALESCE para manejar filtros dinámicos
//       const querySql = `
//         SELECT b.*
//         FROM Books b
//         LEFT JOIN Books_Generos bg ON b.id = bg.bookId
//         WHERE (COALESCE($1, b.autorId) = b.autorId)
//           AND (COALESCE($2, b.editorialId) = b.editorialId)
//           AND (COALESCE($3, bg.generoId) = bg.generoId)
//       `;

//       // Asignación de los valores de los parámetros de consulta o NULL si no existen
//       const values = [
//         autorId || null,
//         editorialId || null,
//         generoId || null,
//       ];

//       const result = await pool.query(querySql, values);
//       return result.rows;


async populate_books() {

  try {

    const result = await pool.query(`
      select * from books
      join autor ON books.autorid = autor.id
      join editorial ON books.editorialid = editorial.id
      join books_generos ON books_generos.bookid = books.id
      `

    )

    return (result.rows)

   } catch (error) { console.log(error) }

}




  async findOne(id: number) {

    try {
      const bookById = await pool.query(`
        SELECT * FROM books
        WHERE books.id = ${id}
        `)

      return bookById.rows;
    } catch (error) {
      console.log(error)
    }
  }


  async findByAuthor(id: number) {

    try {
      const bookByAuthor = await pool.query(`
        SELECT * FROM books
        JOIN autor ON books.autorid = autor.id
        WHERE autor.id = ${id}
        `)

      return bookByAuthor.rows;
    } catch (error) {
      console.log(error)
    }
  }

  async findByEditorial(id: number) {

    try {
      const bookByEditorial = await pool.query(`
        SELECT * FROM books
        JOIN editorial ON books.editorialid = editorial.id
        WHERE editorial.id = ${id}
        `)

      return bookByEditorial.rows;
    } catch (error) {
      console.log(error)
    }
  }

  async findByGenero(id: number) {

    try {
      const bookByGenero = await pool.query(`
        SELECT * FROM books_generos
        JOIN genero ON genero.id = books_generos.generoid
        JOIN books ON books_generos.bookid = books.id
        WHERE genero.id = ${id}
        `)

      return bookByGenero.rows;
    } catch (error) {
      console.log(error)
    }
  }



  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
