import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthorizationGuard } from './auth/guards/jwt-authorization.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthorizationGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
