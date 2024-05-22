import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../../core/auth/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private engineService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req): Promise<any> {
        return this.engineService.generateJWT(req.user);
    }
}
