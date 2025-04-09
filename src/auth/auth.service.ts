import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(email);
    if (user) {
      const isValid = this.usersService.isValidPassword((pass), (user.password));
        if (isValid) {
            return user;
        }
    }
    return null;
}
  async login(user: IUser){
    const { _id, name, email } = user
    const payload = { 
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      
    }
    let refresh_token = await this.createRefreshToken(payload)
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token,
      user: {
        _id,
        name,
        email,
        
      },
    }
  }

  async register(registerUserDto: RegisterUserDto) { 
    let newUser = await this.usersService.register(registerUserDto);
    const {_id, createdAt} = newUser;
    return {
      _id,
      createdAt,
    };
  }

  async createRefreshToken(payload: any) {
    const refresh_token = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'), 
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRED'), 
    });
    return refresh_token;
}
}