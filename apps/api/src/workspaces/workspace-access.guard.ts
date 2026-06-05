import {

  Injectable,

  CanActivate,

  ExecutionContext,

  ForbiddenException

} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspaceAccessGuard
  implements CanActivate {

  constructor(

    private prisma: PrismaService

  ) {}

  async canActivate(

    context: ExecutionContext

  ): Promise<boolean> {

    const request =

      context
        .switchToHttp()
        .getRequest();

    const userId =
      request.user?.sub;

    const workspaceId =

      request.workspaceId ??

      request.user?.workspace_id;

    console.log({

      userId,

      workspaceId
    });

    if (

      !userId ||

      !workspaceId

    ) {

      throw new ForbiddenException(

        'Workspace access denied'
      );
    }

    const membership =

      await this.prisma.workspace_members.findFirst({

        where: {

          user_id:
            userId,

          workspace_id:
            workspaceId,

          is_active:
            true
        }
      });

    if (!membership) {

      throw new ForbiddenException(

        'Workspace access denied'
      );
    }

    request.workspaceId =
      workspaceId;

    return true;
  }
}