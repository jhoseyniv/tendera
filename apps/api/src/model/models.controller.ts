import {

  Body,

  Controller,

  Get,

  Post,

  Patch,

  Param,

  Req,

  UseGuards

} from '@nestjs/common';
import {

  JwtAuthGuard

} from '../auth/jwt-auth.guard';

import {

  ModelsService

} from './models.service';

@Controller('models')

export class ModelsController {

  constructor(

    private modelsService: ModelsService

  ) {}

  @Get()

  @UseGuards(
    JwtAuthGuard
  )

  async findAll(

    @Req()
    req: any

  ) {

    console.log(req.user);
    return this.modelsService.findAll(

      req.user.tenant_id,

      req.user.workspace_id
    );
  }
@Post()

@UseGuards(
  JwtAuthGuard
)

async create(

  @Req()
  req: any,

  @Body()
  body: any

) {

  return this.modelsService.create({

    tenant_id:
      req.user.tenant_id,

    workspace_id:
      req.user.workspace_id,

    created_by:
      req.user.sub,

    ...body
  });
}

@Patch(':id/deactivate')

@UseGuards(
  JwtAuthGuard
)

async deactivate(

  @Param('id')
  id: string,

  @Req()
  req: any

) {
  console.log({
  id,
  tenantId: req.user.tenant_id,
  workspaceId: req.user.workspace_id
});
  return this.modelsService.deactivate(

    id,

    req.user.tenant_id,

    req.user.workspace_id
  );
}
}