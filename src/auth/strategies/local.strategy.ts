import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configura el nombre de usuario y el campo de contraseña que se recibirán
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  validate(username: string, password: string){
    return this.authService.validateUser({username, password});
  }
}
