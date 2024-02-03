import { Controller, Get, Post, Put, Delete, Body, ValidationPipe, UsePipes, Param, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';

import { CreateUserDtoFromDtoFolder } from '../dto/create-user.dto/create-user.dto';
import { UpdateUserDtoFromDtoFolder } from '../dto/update-user.dto/update-user.dto';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('My-App')
export class AppController {

  constructor(private readonly appService: AppService) { }


  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  postUser(@Body() createUserdto: CreateUserDtoFromDtoFolder) {
    return this.appService.CreateUser(createUserdto);

  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  get() {
    return this.appService.getUsers();
  }

  @Get(':id')

  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  getoneUser(@Param('id') id: string) {
    return this.appService.getOneUsers(id)
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  UpdateUser(@Param('id') id: string, @Body() userupdated: UpdateUserDtoFromDtoFolder) {
    return this.appService.UpdateUser(id, userupdated);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  DeleteUser(@Param('id') id: string) {
    return this.appService.DeleteUser(id);

  }
}
