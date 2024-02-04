// user.module.ts
import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Userschema, Myuserschema } from '../models/user.schema';
import { RolesGuard } from '../guard/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Userschema.name, schema: Myuserschema }]),
        JwtModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        RolesGuard,
    ],
})
export class UserModule { }
