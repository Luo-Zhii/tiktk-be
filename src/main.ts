import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ms from 'ms';
import passport from "passport"
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { useContainer } from 'class-validator';
import { TransformInterceptor } from './core/transform.interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // config kafka 
  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
    },
  });
  await app.startAllMicroservices();


  // config class validator
  useContainer(app.select(AppModule), {fallbackOnErrors: true})
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // nếu có field thừa sẽ báo lỗi
      transform: true, // chuyển đổi payload thành instance của class (giúp kiểu hóa số, boolean,...)
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  // config global jwt guards
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  //config view engine
  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('ejs');

  //config cookies
  app.use(cookieParser());

  //config session
  app.use(session({
    secret: configService.get<string>('EXPRESS_SESSION_SECRET'),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: ms(configService.get<string>('EXPRESS_SESSION_COOKIE')) },
    store: MongoStore.create({
      mongoUrl: configService.get<string>('MONGODB_URI'),
    })
  }));

  //config passport
  app.use(passport.initialize())
  app.use(passport.session())


  //config cors 
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    preflightContinue: false,
  });


  // config Interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector))

  await app.listen(port);
}
bootstrap();
