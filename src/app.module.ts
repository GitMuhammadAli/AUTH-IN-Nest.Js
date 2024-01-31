import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { Userschema, Myuserschema } from './auth/user.schema';
import { AppService } from './app.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Userschema.name, schema: Myuserschema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/my-nest-app'),

  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
