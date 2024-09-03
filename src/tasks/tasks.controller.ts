import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Pool } from "pg";
import { HelloTasksQueryDto } from 'src/tasks/dto/query.dto';
import { ProductoTS } from './tasks.entity';
import { TasksService } from './tasks.service';



const pool = new Pool ({
  host: "localhost",
  user: 'postgres',
  password: 'eldiego10',
  database: 'test',
})

const x = "esta piola Nest ehhh"
const x2 = 2

@ApiTags('Tareas')
@Controller('api/tareas')
export class TasksController {

constructor(private taskService:TasksService){}


@Get()
@ApiResponse({ status: 201, description: 'The record has been successfully created.'})
helloTasks(@Query() query: HelloTasksQueryDto): string {

  const {show, show2} = query

     console.log(x2);
     console.log(show);
     console.log(show2);


    return x
  }

  @Get(':id/products/:cid')
  @ApiResponse({ status: 201, description: 'Respuesta exitosa.'})
  showParams(@Param('id') id: string, @Param('cid') cid: string, @Res() res: Response ) {
      console.log(cid);

    res.json(id)
  }


  @Get('beers')
  @ApiOkResponse({description: 'Birras OK!!'})
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
  @ApiCreatedResponse()
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

