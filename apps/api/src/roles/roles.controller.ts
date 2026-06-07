import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  NotFoundException
} from '@nestjs/common';

import {
  RolesService
} from './roles.service';

import {
  JwtAuthGuard
} from '../auth/jwt-auth.guard';

import {
  PlatformRoleGuard
} from '../auth/guards/platform-role.guard';

import {
  PlatformRoles
} from '../auth/decorators/platform-roles.decorator';

import type {
  Request
} from 'express';

@Controller('roles')
export class RolesController {

  constructor(
    private readonly rolesService: RolesService
  ) {}

  @UseGuards(
    JwtAuthGuard,
    PlatformRoleGuard
  )
  @PlatformRoles('platform_admin')
  @Get()
  async findAll() {

    return this.rolesService.findAll();
  }

  @UseGuards(
    JwtAuthGuard,
    PlatformRoleGuard
  )
  @PlatformRoles('platform_admin')
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {

    return this.rolesService.findOne(id);
  }

  @UseGuards(
    JwtAuthGuard,
    PlatformRoleGuard
  )
  @PlatformRoles('platform_admin')
  @Post()
  async create(
    @Req() req: Request,
    @Body() body: any
  ) {

    return this.rolesService.createRole(

      body,

      req.user!.sub
    );
  }

  @UseGuards(
    JwtAuthGuard,
    PlatformRoleGuard
  )
  @PlatformRoles('platform_admin')
  @Patch(':id')
  async update(

    @Req() req: Request,

    @Param('id') id: string,

    @Body() body: any
  ) {

    return this.rolesService.updateRole(

      id,

      body,

      req.user!.sub
    );
  }

  @UseGuards(
    JwtAuthGuard,
    PlatformRoleGuard
  )
  @PlatformRoles('platform_admin')
  @Delete(':id')
  async remove(
    @Param('id') id: string
  ) {

    return this.rolesService.deleteRole(id);
  }
}