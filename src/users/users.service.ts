import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Pool } from "pg";
import { RegisterDto } from './../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';


const pool = new Pool ({
  host: "localhost",
  user: 'postgres',
  password: 'eldiego10',
  database: 'nest.js',
})

@Injectable()
export class UsersService {

  async create(registerDto: RegisterDto) {

    const {
      username,
      age,
      password,
      address,
      role,
    } = registerDto;

    const hashed_password = await bcrypt.hash(password, 10) // el 2do argumento es el Número de rondas de sal para el algoritmo bcrypt

    // crear el new User
    const queryInsertUser = `
      INSERT INTO Users (username, age, password, address, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const valuesCreateUser = [username, age, hashed_password, address, role];

    try {
      const created_User = await pool.query(queryInsertUser, valuesCreateUser);
      return { User_id: created_User.rows[0].id, message: 'User created successfully' }
    } catch (error) {
      console.error('Error creating the User:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUser(username: string) {

    try {
        const result = await pool.query(`
        select * from Users
        where username = $1
        `, [username])  // where username = '${username}' // tambien se podria colocar asi la query directamente con el template string, pero es menos seguro!! Se recomienda siempre usar marcadores de posicion y pasar los valores por []


        return result.rows
     } catch (error) { console.log(error) }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
