import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './../../features/users/users.module';
import { AuthService } from './../../core/auth/auth.service';
import { LocalStrategy } from './../../core/auth/strategies/local.strategy';
import { JwtStrategy } from './../../core/auth/strategies/jwt.strategy';
import { AuthController } from './../../core/auth/auth.controller';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: process.env.TOKEN_EXPIRATION ?? '1d',
                    },
                };
            },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }
