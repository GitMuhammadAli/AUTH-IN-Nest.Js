import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { CreateAuthUserDtoFromDtoFolder } from 'src/dto/create-auth-user.dto/create-auth-user.dto';
import { UpdateAuthUserDtoFromDtoFolder } from 'src/dto/update-auth-user.dto/update-auth-user.dto';
import { LoginAuthUser } from 'src/dto/login-auth-user/login-auth-user';
import { Loginschema } from 'src/models/login.schema';

import * as bcrypt from 'bcrypt';
import { InitializeOnPreviewAllowlist } from '@nestjs/core';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(Loginschema.name) private readonly LoginschemaModel: Model<Loginschema>,
        @Inject(JwtService) private readonly jwtService: JwtService,
        private readonly configservice: ConfigService
    ) { }
    async register(signUpDto: CreateAuthUserDtoFromDtoFolder): Promise<{ token: string }> {
        const { name, password, role } = signUpDto

        if (!['admin', 'manager'].includes(role)) {
            throw new Error('Invalid role. Allowed roles are: admin, manager');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const Authuser = await this.LoginschemaModel.create({
            name,
            password: hashedPassword,
            role
        })
        const token = this.jwtService.sign({ id: Authuser._id })
        return { token }
    }

    async login(loginDto: LoginAuthUser): Promise<{ token: string }> {
        const { name, password } = loginDto;

        const Authuser = await this.LoginschemaModel.findOne({ name });
        if (!Authuser) {
            throw new UnauthorizedException('Invalid name');
        }

        const checkpassword = await bcrypt.compare(password, Authuser.password);
        if (!checkpassword) {
            throw new UnauthorizedException('Invalid password');
        }

        const token = this.jwtService.sign({ id: Authuser._id });
        return { token };
    }



    async getall() {
        const users = await this.LoginschemaModel.find().exec()
        return users;
    }


    // async getOneAuth(id: string): Promise<{ data: Loginschema | null, message: string }> {
    //     try {
    //         const OneAuth = await this.LoginschemaModel.findById(id).exec();
    //         if (OneAuth) {
    //             return {
    //                 message: "fetched auth successfully",
    //                 data: OneAuth,
    //             }
    //         }
    //         else {
    //             return { message: "user not found", data: null };
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }



    // async UpdateAuth(id: string, updateAuthDto: UpdateAuthUserDtoFromDtoFolder): Promise<{ message: string, data: Loginschema | null }> {
    //     try {
    //         const updateauth = await this.LoginschemaModel.findByIdAndUpdate(id, updateAuthDto, { new: true }).exec();
    //         if (updateauth) {
    //             return {
    //                 message: "auth updated successfully",
    //                 data: updateauth,
    //             }
    //         }
    //         else {
    //             return {
    //                 message: "auth not found",
    //                 data: null
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


}

