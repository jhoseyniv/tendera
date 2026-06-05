import {

  Injectable

} from '@nestjs/common';

import {

  PrismaService

} from '../../prisma/prisma.service';

@Injectable()

export class WorkspacesService {

  constructor(

    private prisma: PrismaService

  ) {}

  async getUserWorkspaces(

    userId: string

  ) {

    const memberships =
      await this.prisma.workspace_members.findMany({

        where: {

          user_id: userId
        },

        include: {

          workspaces: true
        },
        distinct: [ 'workspace_id' ]

      });

    return memberships.map(

      (m) => ({

        id:
          m.workspaces.id,

        name:
          m.workspaces.name,

        code:
          m.workspaces.code
      })
    );
  }
}
