import { Injectable } from '@nestjs/common';
import { Pool } from "pg";
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const pool = new Pool ({
  host: "localhost",
  user: 'postgres',
  password: 'eldiego10',
  database: 'nest.js',
})


@Injectable()
export class OrdersService {
  async create(createOrderDto: CreateOrderDto) {

      const {
        userId,
        orderDate,
        purchased_books,
        status,
      } = createOrderDto;

    const queryInsertOrder = `
    INSERT INTO Orders (userId, fecha, estado)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;

  try {
    const client = await pool.connect();

    try {
      // Iniciar una transacción
      await client.query('BEGIN');

      // Insertar la orden y obtener su ID
      const result = await client.query(queryInsertOrder, [
        userId,
        orderDate || new Date().toISOString(),
        status || 'in progress...',
      ]);

      const orderId = result.rows[0].id;

      // Insertar los libros comprados en la tabla intermedia
      const queryInsertItems = `
        INSERT INTO Order_Books (order_id, bookid, cantidad)
        VALUES ($1, $2, $3);
      `;

      for (const book of purchased_books) {
        await client.query(queryInsertItems, [orderId, book.bookId, book.quantity]);
      }

       // Actualizar Stock
       const queryUpdateStock = `
        UPDATE Stock
      SET cantidad = cantidad - $2
      WHERE Stock.bookid = $1;
     `;

     for (const book of purchased_books) {
      await client.query(queryUpdateStock, [book.bookId, book.quantity]);
    }


      // Confirmar la transacción
      await client.query('COMMIT');

      return { id: orderId, message: 'Order created successfully' };
    } catch (error) {
      // Revertir la transacción en caso de error
      await client.query('ROLLBACK');
      console.error('Error inserting order:', error);
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}



  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
