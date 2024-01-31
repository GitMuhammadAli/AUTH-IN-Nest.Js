import { MinLength } from 'class-validator';

export class CreateUserDto {
    name: string;

    @MinLength(8)
    password: string;

    role: string;
}
