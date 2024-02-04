import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // No specific roles required, access is granted
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization && request.headers.authorization.split(' ')[1];

        try {
            if (!token) {
                throw new UnauthorizedException('Access denied. No token provided.');
            }

            const secret = this.configService.get<string>('JWT_SECRET_KEY');
            const decodedToken = this.jwtService.verify(token, { secret });
            console.log(decodedToken.role);
            if (decodedToken && requiredRoles.includes(decodedToken.role)) {
                request.user = decodedToken;
                return true; // User has the required role, access is granted
            } else {
                throw new UnauthorizedException('Access denied. User does not have the required role.');
            }
        } catch (ex) {
            console.error('Token verification failed:', ex);
            throw new UnauthorizedException('Invalid token.');
        }
    }
}
