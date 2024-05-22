import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './../../core/auth/auth.service';
import { AuthDto } from 'src/core/auth/types/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private engineService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiBody({ type: AuthDto, })
    login(@Req() req): Promise<any> {
        return this.engineService.generateJWT(req.user);
    }
}
