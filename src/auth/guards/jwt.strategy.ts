import { Injectable, Res } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }
    
    private static extractJWT(@Res() req: Request): string | null {
        if (req.cookies && "auth_token" in req.cookies && req.cookies.auth_token.length > 0) {
            return req.cookies.auth_token;
        }
        return null;
    }

    async validate(payload: { id: string, userName: string, userType: boolean}) {
        return {
            id: payload.id,
        };
    }
}
