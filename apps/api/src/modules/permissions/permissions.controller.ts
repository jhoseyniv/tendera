import {

  Controller,

  Get,

  Post,

  Patch,

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
  'permissions/:id',
)
async getPermissionById(

  @Param('id')
  id: string,
) {

  return this.permissionsService.getPermissionById(
    id,
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
  'permissions',
)
async createPermission(

  @Body()
  body: any,
) {

  return this.permissionsService.createPermission(
    body,
  );
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
@Patch(
  'permissions/:id',
)
async updatePermission(

  @Param('id')
  id: string,

  @Body()
  body: any,
) {

  return this.permissionsService.updatePermission(

    id,

    body,
  );
}


@Get(
  'permissions/:id/roles',
)
async getPermissionRoles(

  @Param('id')
  permissionId: string,
) {

  return this.permissionsService.getPermissionRoles(
    permissionId,
  );
}


@UseGuards(
  JwtAuthGuard,
)
@Get(
  'permissions/:id/users',
)
async getPermissionUsers(

  @Param('id')
  permissionId: string,
) {

  return this.permissionsService.getPermissionUsers(
    permissionId,
  );
}

@UseGuards(
  JwtAuthGuard,
)
@Delete(
  'permissions/:id',
)
async deletePermission(

  @Param('id')
  id: string,
) {

  return this.permissionsService.deletePermission(
    id,
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

  @UseGuards(
  JwtAuthGuard,
)
@Post(
  'permissions/:id/roles',
)
async assignRoleToPermission(

  @Param('id')
  permissionId: string,

  @Body()
  body: {
    roleId: string;
  },
) {

  return this.permissionsService.assignRoleToPermission(

    permissionId,

    body.roleId,
  );
}

@UseGuards(
  JwtAuthGuard,
)
@Delete(
  'permissions/:id/roles/:roleId',
)
async removeRoleFromPermission(

  @Param('id')
  permissionId: string,

  @Param('roleId')
  roleId: string,
) {

  return this.permissionsService.removeRoleFromPermission(

    permissionId,

    roleId,
  );
}
}