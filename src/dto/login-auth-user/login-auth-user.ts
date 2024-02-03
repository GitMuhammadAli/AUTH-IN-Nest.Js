import { MinLength, IsNotEmpty } from 'class-validator';

export class LoginAuthUser {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

}