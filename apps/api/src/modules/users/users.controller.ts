import {

  Controller,

  Get,

  Post,

  Delete,

  Param,

  Body,

  UseGuards,

  Patch,

} from '@nestjs/common';

import {

  JwtAuthGuard,

} from '../../auth/jwt-auth.guard';

import {

  UsersService,

} from './users.service';

@Controller()
export class UsersController {

  constructor(

    private readonly usersService:
      UsersService,

  ) {}

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'users/:id/roles',
  )
  async getUserRoles(

    @Param('id')
    id: string,
  ) {

    return this.usersService.getUserRoles(
      id,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'users/:id/workspaces',
  )
  async getUserWorkspaces(

    @Param('id')
    id: string,
  ) {

    return this.usersService.getUserWorkspaces(
      id,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post(
    'users/:id/workspaces',
  )
  async assignWorkspace(

    @Param('id')
    id: string,

    @Body()
    body: {
      workspaceId: string;
    },
  ) {

    return this.usersService.assignWorkspaceToUser(

      id,

      body.workspaceId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Delete(
    'users/:id/workspaces/:workspaceId',
  )
  async removeWorkspace(

    @Param('id')
    id: string,

    @Param('workspaceId')
    workspaceId: string,
  ) {

    return this.usersService.removeWorkspaceFromUser(

      id,

      workspaceId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'users/:id',
  )
  async getUserById(

    @Param('id')
    id: string,
  ) {

    return this.usersService.getUserById(
      id,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'users',
  )
  async getAllUsers() {

    return this.usersService.getAllUsers();
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post(
    'users',
  )
  async createUser(

    @Body()
    body: {

      tenant_id: string;

      firstName?: string;

      lastName?: string;

      email: string;

      passwordHash?: string;
    },
  ) {

    return this.usersService.createUser(
      body,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Patch(
    'users/:id',
  )
  async updateUser(

    @Param('id')
    id: string,

    @Body()
    body: {

      firstName?: string;

      lastName?: string;

      email?: string;
    },
  ) {

    return this.usersService.updateUser(

      id,

      body,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Delete(
    'users/:id',
  )
  async deleteUser(

    @Param('id')
    id: string,
  ) {

    return this.usersService.deleteUser(
      id,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Get(
    'roles/:id/users',
  )
  async getRoleUsers(

    @Param('id')
    roleId: string,
  ) {

    return this.usersService.getRoleUsers(
      roleId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Post(
    'roles/:id/users',
  )
  async assignUser(

    @Param('id')
    roleId: string,

    @Body()
    body: {
      userId: string;
    },
  ) {

    return this.usersService.assignUserToRole(

      roleId,

      body.userId,
    );
  }

  @UseGuards(
    JwtAuthGuard,
  )
  @Delete(
    'roles/:id/users/:userId',
  )
  async removeUser(

    @Param('id')
    roleId: string,

    @Param('userId')
    userId: string,
  ) {

    return this.usersService.removeUserFromRole(

      roleId,

      userId,
    );
  }
}