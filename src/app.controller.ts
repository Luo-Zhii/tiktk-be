import { Controller, Get, Post,  UseGuards, Request, Body, Param, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorator/jwt_public';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }
}
