import { Controller, Get, Post, Put, Delete, Body, ValidationPipe, UsePipes, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDtoFromDtoFolder } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDtoFromDtoFolder } from './dto/update-user.dto/update-user.dto';

@Controller('My-App')
export class AppController {

  constructor(private readonly appService: AppService) { }


  @Post()
  @UsePipes(new ValidationPipe())
  postUser(@Body() createUserdto: CreateUserDtoFromDtoFolder) {
    return this.appService.CreateUser(createUserdto);

  }

  @Get()
  get() {
    return this.appService.getUsers();
  }

  @Get(':id')
  getoneUser(@Param('id') id: string) {
    return this.appService.getOneUsers(id)
  }

  @Put(':id')
  UpdateUser(@Param('id') id: string, @Body() userupdated: UpdateUserDtoFromDtoFolder) {
    return this.appService.UpdateUser(id, userupdated);
  }

  @Delete(':id')
  DeleteUser(@Param('id') id: string) {
    return this.appService.DeleteUser(id);

  }




}
