import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
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

  await app.listen(PORT || 3002);
  //await mongoose.connect(configService.get("MONGO_LOCAL"))
  console.log(`App listening in PORT ${PORT}.`);
  console.log(`App listening in PORT ${process.env.PORT}. Usando process.env directo`);


}
bootstrap();
