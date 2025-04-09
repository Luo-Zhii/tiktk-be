import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMessage } from 'src/auth/decorator/message';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/auth/decorator/jwt_public';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @ResponseMessage('fetched user data succesfully')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Public()
  @Post()
  @ResponseMessage('fetched user data successfully')
  async create(
    @Body() createUserDto: CreateUserDto,
  ) {
    let newUser: any = await this.usersService.create(createUserDto);
    if (newUser) {
      return {
        _id: newUser._id,
        createdAt: newUser.createdAt
      };
    }
  }

  @Patch()
  @ResponseMessage('update info user data successfully')
  update(
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ResponseMessage('delete user successfully')
  deleteUser(@Param('id') id: string, ): any {
    return this.usersService.removeById(id)
  }


}
