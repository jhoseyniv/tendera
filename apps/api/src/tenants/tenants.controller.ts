import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlatformRoleGuard } from '../auth/guards/platform-role.guard';
import { PlatformRoles } from '../auth/decorators/platform-roles.decorator';
import type { Request } from 'express';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // فقط Platform Admin می‌تواند Tenant بسازد
  @UseGuards(JwtAuthGuard, PlatformRoleGuard)
  @PlatformRoles('platform_admin')
  @Post()
  async create(@Req() req: Request, @Body() body: any) {
    const createdBy = req.user!.sub;
    return this.tenantsService.createTenant(body, createdBy);
  }

  // همه کاربران JWT اعتبارسنجی شده می‌توانند لیست Tenant ها را ببینند
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    return this.tenantsService.findAll();
  }

  // فقط Platform Admin می‌تواند Tenant را ویرایش کند
  @UseGuards(JwtAuthGuard, PlatformRoleGuard)
  @PlatformRoles('platform_admin')
  @Patch(':id')
  async update(@Req() req: Request, @Param('id') id: string, @Body() body: any) {
    const updatedBy = req.user!.sub;
    return this.tenantsService.updateTenant(id, body, updatedBy);
  }

  // فقط Platform Admin می‌تواند Tenant را حذف کند
  @UseGuards(JwtAuthGuard, PlatformRoleGuard)
  @PlatformRoles('platform_admin')
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const deletedBy = req.user!.sub;
    return this.tenantsService.deleteTenant(id, deletedBy);
  }

  // همه کاربران JWT اعتبارسنجی شده می‌توانند یک Tenant مشخص را ببینند
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantsService.findOne(id);
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }
}