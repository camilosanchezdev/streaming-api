import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/features/users/users.module';
import { AuthService } from 'src/core/auth/auth.service';
import { LocalStrategy } from 'src/core/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/core/auth/strategies/jwt.strategy';
import { AuthController } from 'src/core/auth/auth.controller';

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
