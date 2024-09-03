import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {transform: true,
    forbidNonWhitelisted: true
  }))
  app.enableCors();
  const configService = app.get(ConfigService)
  const PORT = configService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('Books e-commerce example')
    .setDescription('The books API description')
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT || 3002);
  //await mongoose.connect(configService.get("MONGO_LOCAL"))
  console.log(`App listening in PORT ${PORT}.`);
  console.log(`App listening in PORT ${process.env.PORT}. Usando process.env directo`);


}
bootstrap();
