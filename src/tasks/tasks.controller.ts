import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Pool } from "pg";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoles } from 'src/enums/user-roles.enum';
import { HelloTasksQueryDto } from 'src/tasks/dto/query.dto';
import { AllBooksQueryDto } from './../books/dto/query.dto';
import { Roles } from './../decorators/roles.decorator';
import { ProductoTS } from './tasks.entity';
import { TasksService } from './tasks.service';



const pool = new Pool ({
  host: "localhost",
  user: 'postgres',
  password: 'eldiego10',
  database: 'nest.js',
})

const x = "Chupala Nest. Aguante feat-04"
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

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin, UserRoles.Premium)
  async findAll(@Query()  queries: AllBooksQueryDto) {

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


  @Get(':id/products/:cid')
  @ApiResponse({ status: 201, description: 'Respuesta exitosa.'})
  showParams(@Param('id') id: string, @Param('cid') cid: string, @Res() res: Response ) {
      console.log(cid);

    res.json(id)
  }


  @Get('beers')
  @Roles(UserRoles.Premium)
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

