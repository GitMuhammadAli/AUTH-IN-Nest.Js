import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../auth/auth.service';
import { Userschema, Myuserschema } from '../models/user.schema';
import { Loginschema } from '../models/login.schema';
import { AppService } from '../services/app.service';
import { AuthModule } from './auth.module';


@Module({
    imports: [
        Loginschema,
        MongooseModule.forFeature([{ name: Userschema.name, schema: Myuserschema }]),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class UserModule { }

