import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AstraModule } from './astra/astra.module';
import { AstraService } from './astra/astra.service';
import { MouseLogModule } from './mouse-log/mouse-log.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    AstraModule,
    MouseLogModule,
    ClientsModule.register([
      {
        name: 'MOUSE_LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mouse-log-client',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'mouse-log-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AstraService,
  ],
  exports: [AstraService],
})

export class AppModule { }
