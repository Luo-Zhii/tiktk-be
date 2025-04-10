import { Controller, Get, Post,  UseGuards, Req, Body, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';

import { Public } from './decorator/jwt_public';
import {  RegisterUserDto } from '../users/dto/create-user.dto';
import { ResponseMessage } from './decorator/message';
import { Response, Request } from 'express';
import { IUser } from '@/users/user.interface';
import { User } from './decorator/pass_user';

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
  async login(@Res({ passthrough: true }) response, @Req() req){
    return this.authService.login(req.user, response);
  }

  @ResponseMessage("Get user infomation")
  @Get('account')
  getAccount(@User() user: IUser) {
    return { user }
  }

  @Public()
  @ResponseMessage('register a new user successfully')
  @Post('/register')
  async register( @Body() registerUserDto : RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }


  @Public()
  @Get('/refresh')
  async getRefresh(@Req() req: Request, @Res({ passthrough: true }) response){
    const refreshToken = req.cookies['refreshToken']
    return this.authService.processRefreshToken(refreshToken, response)
  }

  @ResponseMessage("Log out successfully")
  @Post('/logout')
  async logout( @Res({ passthrough: true }) response,@User() user: IUser){
    return this.authService.logout( response, user)
  }

}
