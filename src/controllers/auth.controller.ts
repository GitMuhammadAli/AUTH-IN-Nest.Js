import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateAuthUserDtoFromDtoFolder } from 'src/dto/create-auth-user.dto/create-auth-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    register(@Body() signup: CreateAuthUserDtoFromDtoFolder): Promise<{ token: string }> {
        return this.authService.register(signup);
    }


}
