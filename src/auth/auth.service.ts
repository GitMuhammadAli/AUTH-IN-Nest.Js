import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateAuthUserDtoFromDtoFolder } from 'src/dto/create-auth-user.dto/create-auth-user.dto';
import { Loginschema } from 'src/models/login.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Loginschema.name) private readonly LoginschemaModel: Model<Loginschema>,
        @Inject(JwtService) private readonly jwtService: JwtService,
    ) { }
    async register(signUpDto: CreateAuthUserDtoFromDtoFolder): Promise<{ token: string }> {
        const { name, password, role } = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10);

        const Authuser = await this.LoginschemaModel.create({
            name,
            password: hashedPassword,
            role
        })
        const token = this.jwtService.sign({ id: Authuser._id })
        return { token }

    }









}
