import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDtoFromDtoFolder } from '../dto/create-user.dto/create-user.dto';
import { UpdateUserDtoFromDtoFolder } from '../dto/update-user.dto/update-user.dto';
import { Model } from 'mongoose';
import { Userschema } from '../models/user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Userschema.name) private readonly MyAppModel: Model<Userschema>) { }

  async CreateUser(createMydto: CreateUserDtoFromDtoFolder): Promise<Userschema> {
    const newuser = new this.MyAppModel({
      ...createMydto,
      id: Date.now()
    })
    return newuser.save();
  }


  async getUsers() {
    const users = await this.MyAppModel.find().exec()
    return {
      message: "fetched users successfully",
      data: users,
    }
  }

  async getOneUsers(id: string): Promise<{ data: Userschema | null, message: string }> {
    const user = await this.MyAppModel.findById(id).exec()
    if (user) {
      return {
        message: "Fetched user successfully",
        data: user,
      };
    } else {
      return {
        message: "User not found",
        data: null,
      };
    }
  }

  async UpdateUser(id: string, updateuserdto: UpdateUserDtoFromDtoFolder): Promise<{ message: string, data: Userschema }> {
    try {
      const updateduser = await this.MyAppModel.findByIdAndUpdate(id, updateuserdto, { new: true }).exec();
      console.log(id);
      return {
        data: updateduser,
        message: "updated successfully"
      }
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteUser(id: string): Promise<{ message: string }> {
    try {
      await this.MyAppModel.findByIdAndDelete(id)
      return {
        message: 'Delete user successfully'
      }
    } catch (error) {
      console.log(error)
    }
  }


  // getHello(): string {
  //   return 'Hello World!';
  // }
}
