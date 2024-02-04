import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateAuthUserDtoFromDtoFolder } from 'src/dto/create-auth-user.dto/create-auth-user.dto';
import { LoginAuthUser } from 'src/dto/login-auth-user/login-auth-user';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    register(@Body() signup: CreateAuthUserDtoFromDtoFolder): Promise<{ token: string }> {
        return this.authService.register(signup);
    }
    @Get('/login')
    login(@Body() login: LoginAuthUser): Promise<{ token: string }> {
        return this.authService.login(login);
    }

    @Get()
    getall() {

        return this.authService.getall();
    }
}
