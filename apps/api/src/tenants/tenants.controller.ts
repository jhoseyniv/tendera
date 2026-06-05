import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlatformAdminGuard } from '../auth/guards/platform-admin.guard';
import type { Request } from 'express';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @UseGuards(JwtAuthGuard, PlatformAdminGuard)
  @Post()
  async create(@Req() req: Request, @Body() body: any) {
    const createdBy =req.user!.sub;
    return this.tenantsService.createTenant(body, createdBy);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    return this.tenantsService.findAll();
  }

  @UseGuards(JwtAuthGuard, PlatformAdminGuard)
  @Patch(':id')
  async update(@Req() req: Request, @Param('id') id: string, @Body() body: any) {
    const updatedBy = req.user!.sub;
    return this.tenantsService.updateTenant(id, body, updatedBy);
  }

  @UseGuards(JwtAuthGuard, PlatformAdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const deletedBy = req.user!.sub;
    return this.tenantsService.deleteTenant(id, deletedBy);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantsService.findOne(id);
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }
}