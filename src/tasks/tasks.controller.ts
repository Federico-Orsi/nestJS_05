import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http';
import { Response } from 'express';
import { Pool } from "pg";
import { ProductoTS } from './tasks.entity';
import { TasksService } from './tasks.service';



// const pool = new Pool ({
//   host: "localhost",
//   user: 'postgres',
//   password: 'eldiego10',
//   database: 'test',
// })
const pool = new Pool ({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT)
})



const x = "esta piola Nest ehhh"
const x2 = 2


@Controller('api/tareas')
export class TasksController {

constructor(private taskService:TasksService){}


@Get()
helloTasks(@Query() query: any): string {

  const {show, show2} = query

     console.log(x2);
     console.log(show);
     console.log(show2);


    return x
  }

  @Get(':id/products/:cid')
  showParams(@Param('id') id: number, @Param('cid') cid: string, @Res() res: Response ) {
      console.log(cid);

    res.send(id)
  }


  @Get('beers')
  async showBeers() {

    try {


      const allBeers = await pool.query('SELECT * FROM beers')
      console.log(allBeers.rows);


      return (allBeers.rows)

     } catch (error) { console.log(error) }

  }

  @Get('people')
  getPeople() {

    return this.taskService.getPeople()

  }

  @Get('dni')
  async getDni() {

    try {


      const allDni = await pool.query('SELECT * FROM dni')
      console.log(allDni.rows);

      return (allDni.rows)

     } catch (error) { console.log(error) }

  }

  @Get('dni/populate')
  async populateDni() {

    try {

      const allDni = await pool.query(`
        select * from persons
        join dni ON persons.id = dni.person_id
        order by persons.id

        `

      )

      console.log(allDni.rows);

      return (allDni.rows)

     } catch (error) { console.log(error) }

  }

  @Get('dni/populate/:id')
  async populateDni_byId(@Param('id') id: string) {

    try {

      const allDni = await pool.query(`
        select * from persons
        join dni ON persons.id = dni.person_id
        where persons.id = ${id}

        `

      )

      console.log(allDni.rows);

      return (allDni.rows)

     } catch (error) { console.log(error) }

  }

  @Post()
  crearProduct(@Body() body: any){

  const newProduct = new ProductoTS(body)
  console.log(newProduct);
  this.taskService.sayHello()
  //this.taskService.createProduct(newProduct)

  return newProduct
  }



}

