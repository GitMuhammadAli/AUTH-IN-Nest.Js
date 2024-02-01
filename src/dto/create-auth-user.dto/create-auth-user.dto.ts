import { MinLength } from 'class-validator';

export class CreateAuthUserDtoFromDtoFolder {
    name: string;

    @MinLength(8)
    password: string;

    role: string;
}
