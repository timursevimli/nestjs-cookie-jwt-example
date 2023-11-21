import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get('/private')
  privateEndpoint(@Req() req): string {
    console.log(req.cookies);
    return this.appService.getHello();
  }

  @Get('/public')
  publicEndpointGet(@Req() req): string {
    console.log(req.cookies);
    return this.appService.getHello();
  }

  @Post('/public')
  publicEndpointPost(@Req() req): string {
    console.log(req.body);
    return this.appService.getHello();
  }
}
