import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthUserDtoFromDtoFolder {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsNotEmpty()
    readonly role: string;
}
