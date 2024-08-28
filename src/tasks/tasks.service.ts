import { Injectable } from '@nestjs/common';
import { Pool } from "pg";
import { productsModel } from './models/schemaProducto';

@Injectable()
export class TasksService {

 sayHello(){
    console.log("fucking TS!!")

 }

 async createProduct(nuevoProducto: Object){
 return await productsModel.create(nuevoProducto)
 }


 async getPeople(){
  try {
         const pool = new Pool ({
         host: "localhost",
         user: 'postgres',
         password: 'eldiego10',
         database: 'test',
       })


      const allPeople = await pool.query('SELECT * FROM persons')
      console.log(allPeople.rows);

      console.log(allPeople.rows[0].name);
      console.log(allPeople.rows[0].last_name);


      return (allPeople.rows)

     } catch (error) { console.log(error) }


 }


}
