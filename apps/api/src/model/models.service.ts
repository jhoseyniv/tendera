import {

  Injectable

} from '@nestjs/common';

import {

  PrismaService

} from '../../prisma/prisma.service';

@Injectable()

export class ModelsService {

  constructor(

    private prisma: PrismaService

  ) {}

  async findAll(

    tenantId: string,

    workspaceId: string

  ) {

    return this.prisma.ai_models.findMany({

      where: {

        tenant_id:
          tenantId,

        workspace_id:
          workspaceId,

        is_active:
          true
      },

      orderBy: {

        name:
          'asc'
      }
    });
  }
  async create(

  data: {

    tenant_id: string;

    workspace_id: string;

    name: string;

    provider: string;

    api_model: string;

    created_by?: string;
  }

) {

  return this.prisma.ai_models.create({

    data: {

      tenant_id:
        data.tenant_id,

      workspace_id:
        data.workspace_id,

      name:
        data.name,

      provider:
        data.provider,

      api_model:
        data.api_model,

      created_by:
        data.created_by,

      is_active:
        true
    }
  });
}

async deactivate(

  id: string,

  tenantId: string,

  workspaceId: string

) {

  return this.prisma.ai_models.updateMany({

    where: {

      id,

      tenant_id: tenantId,

      workspace_id: workspaceId
    },

    data: {

      is_active: false
    }
  });
}
}