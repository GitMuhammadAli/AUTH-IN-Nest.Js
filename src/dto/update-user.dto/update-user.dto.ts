import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDtoFromDtoFolder } from '../create-user.dto/create-user.dto';

export class UpdateUserDtoFromDtoFolder extends PartialType(CreateUserDtoFromDtoFolder) { }
