import { Controller, Get, Post,  UseGuards, Request, Body, Param, Patch } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

import { Public } from './decorator/jwt_public';
import {  RegisterUserDto } from '../users/dto/create-user.dto';
import { ResponseMessage } from './decorator/message';

@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
  ) { }

  //If you want skip jwt guard, use @Public()
  @Public()
  @ResponseMessage('User Login')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @ResponseMessage('register a new user successfully')
  @Post('/register')
  async register( @Body() registerUserDto : RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }
}
