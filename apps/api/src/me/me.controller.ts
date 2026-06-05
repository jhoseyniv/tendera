import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('pages')
  async getPages(@Req() req) {
    // req.user.sub = userId
    return this.meService.getPagesForUser(req.user.sub);
  }
}