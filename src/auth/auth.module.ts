import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyLoginschema, Loginschema } from 'src/models/login.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRE'),
        },
      }),
    }),
    MongooseModule.forFeature([{ name: Loginschema.name, schema: MyLoginschema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
