import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

const pool = new Pool ({
    host: "localhost",
    user: 'postgres',
    password: 'eldiego10',
    database: 'nest.js',
  })

@Injectable()
export class BooksServiceTwo {
  async findOne(id: number) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  }
}