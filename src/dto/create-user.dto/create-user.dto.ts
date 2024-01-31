import { MinLength } from 'class-validator';

export class CreateUserDtoFromDtoFolder {
    name: string;

    @MinLength(8)
    password: string;

    role: string;
}
