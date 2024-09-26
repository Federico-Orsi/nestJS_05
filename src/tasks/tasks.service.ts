import { Injectable } from '@nestjs/common';
import { Pool } from "pg";

@Injectable()
export class TasksService {

 sayHello(){
    console.log("fucking TS!!")
    console.log("helloo PR!!")

 }

//  async createProduct(nuevoProducto: Object){
//  return await productsModel.create(nuevoProducto)
//  }


 async getPeople(){
  try {
      //    const pool = new Pool ({
      //    host: "localhost",
      //    user: 'postgres',
      //    password: 'eldiego10',
      //    database: 'test',
      //  })
       const pool = new Pool ({
         host: process.env.POSTGRES_HOST,
         user: process.env.POSTGRES_USERNAME,
         password: process.env.POSTGRES_PASSWORD,
         database: process.env.POSTGRES_DB,
         port: parseInt(process.env.POSTGRES_PORT)
       })

      const allPeople = await pool.query('SELECT * FROM persons')
      console.log(allPeople.rows);

      console.log(allPeople.rows[0].name);
      console.log(allPeople.rows[0].last_name);


      return (allPeople.rows)

     } catch (error) { console.log(error) }


 }


}
