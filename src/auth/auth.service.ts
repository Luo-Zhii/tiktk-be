import { BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/user.interface';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
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

  async login(user: IUser, response: Response): Promise<any> {
    const { _id, name, email } = user;
    const payload = { 
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
    };

    let refreshToken = await this.createRefreshToken(payload);
    

    await this.usersService.updateRefreshToken(_id, refreshToken);

    response.clearCookie('refreshToken')

    // Set cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRED')),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
      },
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    let newUser = await this.usersService.register(registerUserDto);
    const {_id, createdAt} = newUser;
    return {
      _id,
      createdAt,
    };
  }

  async logout(res: Response, user: IUser) {
    await this.usersService.updateRefreshToken(user._id, "")
    res.clearCookie('refreshToken');
    return 'Ok!'
  }

  async createRefreshToken(payload: any) {
    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN'), 
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRED'), 
    });
    return refreshToken;
  }

  async processRefreshToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN')
      });
      let user = await this.usersService.findUserByRefreshToken(refreshToken);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }
      const { _id, name, email } = user;
      const payload = { 
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
      
    };

    let refresh_token = await this.createRefreshToken(payload);
    
    await this.usersService.updateRefreshToken(_id.toString(), refresh_token);

    response.clearCookie('refreshToken')

    // Set cookie
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRED')),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
      },
    };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
