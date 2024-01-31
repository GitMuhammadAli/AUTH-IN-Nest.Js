import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto/delete-user.dto';
import { Model } from 'mongoose';
import { Userschema } from './auth/user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Userschema.name) private readonly MyAppModel: Model<Userschema>) { }

  async CreateUser(createMydto: CreateUserDto): Promise<Userschema> {
    const newuser = new this.MyAppModel({
      ...createMydto,
      id: Date.now()
    })
    return newuser.save();
  }




  getHello(): string {
    return 'Hello World!';
  }
}
