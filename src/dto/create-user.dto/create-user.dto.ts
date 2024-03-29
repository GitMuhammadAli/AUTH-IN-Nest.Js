import { MinLength } from 'class-validator';

export class CreateUserDtoFromDtoFolder {
    name: string;

    @MinLength(8)
    email: string;

    role: string;
}
