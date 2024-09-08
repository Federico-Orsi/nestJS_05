import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenPayload } from './token-payload.interface';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ){}

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async login(user, res: Response) {
   const expires_Access_Token = new Date()
   expires_Access_Token.setMilliseconds(expires_Access_Token.getTime() + parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_MS))

    const tokenPayload: TokenPayload = {username: user.username}
    const access_Token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME_MS}ms`
    })

    res.cookie('Authentication', access_Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expires_Access_Token // al no encontrar NODE_ENV retorna false, lo que hace que podamos acceder a las cookies en desarrollo, ya que es una conexión HTTP (no segura)
    }) // en cambio si existe NODE_ENV en production, esto asegura que el secure será true, ya que en production siempre se recomienda usar conextiones HTTPS!!

    return {user: user, message: 'Usuario loggeado exitosamente!!'};
  }

  async validateUser(loginDto: LoginDto) {

   try {
     const user = await this.usersService.getUser(loginDto.username);

     if (user?.length === 0){
       throw new UnauthorizedException('Invalid credentials: User not found');
     }

     const checkPassword = await bcrypt.compare(loginDto.password, user[0]?.password);

     if (!checkPassword) throw new UnauthorizedException('Invalid credentials: password is incorrect');

     return user;
   } catch (error) {
    console.log(error);
   }

  }


}
