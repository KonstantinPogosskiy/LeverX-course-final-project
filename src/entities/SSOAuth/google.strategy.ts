import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '1082352364203-1qbap270kln9f154fb5f556d956ldrm8.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done:
    VerifyCallback): Promise<any> {
    const { emails, photos } = profile;
    const user = {
      email: emails[0].value,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
