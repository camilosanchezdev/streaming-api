import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/core/auth/decorators/role.decorator';
import { TokenType } from 'src/core/auth/types/token.type';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        ctx: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles: number[] = this.reflector.get<number[]>(
            ROLES_KEY,
            ctx.getHandler(),
        );
        if (!roles) return true;

        const request = ctx.switchToHttp().getRequest();
        const user = request.user as TokenType;
        const isAllowed = roles.some((r) => r === user.roleId);
        if (!isAllowed) {
            throw new UnauthorizedException('Unauthorized');
        }
        return isAllowed;
    }
}
