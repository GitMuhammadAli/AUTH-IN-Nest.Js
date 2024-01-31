import { Controller, Get, Post, Put, Delete, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';

@Controller('My-App')
export class AppController {

  constructor(private readonly appService: AppService) { }


  @Post()
  @UsePipes(new ValidationPipe())
  postUser(@Body() createUserdto: CreateUserDto) {
    return this.appService.CreateUser(createUserdto);

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getoneUser() {

  }

  @Put(':id')
  UpdateUser() {

  }

  @Delete(':id')
  DeleteUser() {

  }




}
