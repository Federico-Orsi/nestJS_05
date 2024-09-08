import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Current_User } from '../decorators/current-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // otra alternativa para acceder al User actual es usando @Request() req , accediendo por req.user !!
  @Post('login')
  @UseGuards(LocalAuthGuard)
 async login(@Current_User() user, @Res({passthrough: true}) res: Response) {

    console.log(JSON.stringify(user.username)  + " Current User"); // usamos el JSON.stringify() porque llegaba como Object Object!!


    return await this.authService.login(user, res);
  }

}
