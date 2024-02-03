import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Userschema, Myuserschema } from '../models/user.schema';
import { AppService } from '../services/app.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Userschema.name, schema: Myuserschema }]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class UserModule { }

