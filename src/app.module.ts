import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { CorsModule } from '@nestjs/platform-express';
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { NestModule } from '@nestjs/common/interfaces/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstNestMiddleware, SecondNestMiddleware } from './middlewares/firstMiddleware';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), BooksModule,
  
  // CorsModule.forRoot({
  //   origin: ['http://127.0.0.1:5173/'],
  //   // Otras opciones de configuración de CORS aquí
  // }),
//  TypeOrmModule.forRoot({
//   type: 'postgres',
//  }),
],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule implements NestModule {

configure(consumer: MiddlewareConsumer){
 consumer.apply(FirstNestMiddleware).forRoutes({
 path: 'api/tareas/:id/products/:cid',
 method: RequestMethod.GET,

 })

 consumer.apply(SecondNestMiddleware).forRoutes({
  path: 'api/tareas',
  method: RequestMethod.GET,
 },
 {
  path: '/',
  method: RequestMethod.GET,
 }
 
 
 )




}
}
