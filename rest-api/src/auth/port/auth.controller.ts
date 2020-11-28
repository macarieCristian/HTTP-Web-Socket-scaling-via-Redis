import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import { AuthService } from '../core/auth.service';
import { TokenDtoOut } from './dto/token-dto-out';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req): Promise<TokenDtoOut> {
    return TokenDtoOut.toDto(await this.authService.login(req.user));
  }
}
