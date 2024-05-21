import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { TokenType } from './types/token.type';
import { UsersService } from 'src/features/users/users.service';
import { AuthResponseType } from 'src/core/auth/types/auth-response.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersService: UsersService,
    ) { }
    async generateJWT(
        user: { res: User },
    ): Promise<AuthResponseType> {
        const payload: TokenType = {
            sub: user.res.id,
            roleId: user.res.roleId,
        };
        return {
            token: this.jwtService.sign(payload),
            email: user.res.email,
        };
    }

    async validateUser(email: string, password: string) {
        const user: User = await this.usersService.getOneByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password, ...res } = user;
                return { res };
            }
        }
        return null;
    }
}
