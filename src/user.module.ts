import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { Userschema, Myuserschema } from './models/user.schema';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Userschema.name, schema: Myuserschema }]),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class UserModule { }

