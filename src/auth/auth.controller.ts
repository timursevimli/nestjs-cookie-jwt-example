import { Controller, Get, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const random = () => Math.floor(Math.random() * 99999);

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('login')
  async login(@Res({ passthrough: true }) res) {
    const payload = { username: 'john', id: random() };
    res.cookie('user_token', this.jwtService.sign(payload), {
      expires: new Date(Date.now() + 3600000),
      secure: true, // Set the cookie as secure (HTTPS only)
      httpOnly: true, // Set the cookie as HTTP-only
    });
    return {};
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', '', { expires: new Date(Date.now()) });
    return {};
  }
}
