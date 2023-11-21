import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { Injectable } from '@nestjs/common';

export const JwtSecretTMP = 'secretKey';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtSecretTMP,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    console.log('Called extractJWT', req.cookies);
    const { cookies } = req;
    if (!cookies) return '';
    const token = cookies['user_token'];
    if (!token) return '';
    return token.length > 0 ? token : '';
  }

  async validate(payload: any) {
    console.log({ payload });
    return { userId: payload.id };
  }
}
