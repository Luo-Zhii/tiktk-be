import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UniqueValidator } from '@/auth/decorator/unique_user';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UniqueValidator],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ]),
    ConfigModule,
  ],

  exports: [UsersService],
})
export class UsersModule {}
