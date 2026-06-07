import {

  Controller,

  Get,

  Post,

  Delete,

  Param,

  Body,

  UseGuards,

} from '@nestjs/common';

import {

  JwtAuthGuard,

} from '../../auth/jwt-auth.guard';

import {

  PermissionsService,

} from './permissions.service';

@Controller()
export class PermissionsController {

  constructor(

    private readonly permissionsService:
      PermissionsService,

  ) {}

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'roles/:id/permissions',
  )
  async getRolePermissions(

    @Param('id')
    roleId: string,
  ) {

    return this.permissionsService.getRolePermissions(
      roleId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'permissions',
  )
  async getAllPermissions() {

    return this.permissionsService.getAllPermissions();
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post(
    'roles/:id/permissions',
  )
  async assignPermission(

    @Param('id')
    roleId: string,

    @Body()
    body: {
      pagePermissionId: string;
    },
  ) {

    return this.permissionsService.assignPermission(

      roleId,

      body.pagePermissionId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Delete(
    'roles/:id/permissions/:permissionId',
  )
  async removePermission(

    @Param('id')
    roleId: string,

    @Param('permissionId')
    permissionId: string,
  ) {

    return this.permissionsService.removePermission(

      roleId,

      permissionId,
    );
  }
}