import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyLoginschema, Loginschema } from 'src/models/login.schema';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MyConfigModule } from './config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MyConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [MyConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Loginschema.name, schema: MyLoginschema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

