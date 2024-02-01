import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthUserDtoFromDtoFolder } from '../create-auth-user.dto/create-auth-user.dto';
export class UpdateAuthUserDtoFromDtoFolder extends PartialType(CreateAuthUserDtoFromDtoFolder) { }
