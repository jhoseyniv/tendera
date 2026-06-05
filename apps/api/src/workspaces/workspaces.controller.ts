import {

  Controller,

  Get,

  Req,

  UseGuards

} from '@nestjs/common';

import {

  JwtAuthGuard

} from '../auth/jwt-auth.guard';

import {

  WorkspacesService

} from './workspaces.service';

import {

  WorkspaceAccessGuard

} from './workspace-access.guard';


@Controller('workspaces')

export class WorkspacesController {

  constructor(

    private readonly workspacesService:
      WorkspacesService

  ) {}

@Get('current')

@UseGuards(

  JwtAuthGuard,

  WorkspaceAccessGuard

)

getCurrentWorkspace(

  @Req() req: any

) {

  return {

    userId:
      req.user.sub,

    workspaceId:
      req.workspaceId
  };
}

  @UseGuards(JwtAuthGuard)

  @Get()

  async getMyWorkspaces(

    @Req() req: any

  ) {

    return this.workspacesService
      .getUserWorkspaces(

        req.user.userId
      );
  }
}
