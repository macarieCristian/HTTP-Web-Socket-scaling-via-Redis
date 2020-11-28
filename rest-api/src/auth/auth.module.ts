import { Module } from '@nestjs/common';
import { AuthService } from './core/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationStrategy } from './strategies/authentication.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthorizationStrategy } from './strategies/authorization.strategy';
import { AuthController } from './port/auth.controller';

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    })],
  providers: [AuthService, AuthenticationStrategy, AuthorizationStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
}
