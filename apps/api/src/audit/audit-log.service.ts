import {

  Injectable

} from '@nestjs/common';

import {

  PrismaService

} from '../../prisma/prisma.service';

@Injectable()

export class AuditLogService {

  constructor(

    private prisma: PrismaService

  ) {}

  async log({

    tenantId,

    userId,

    action,

    resourceType,

    resourceId,

    metadata,

  }: {

    tenantId?: string;

    userId?: string;

    action: string;

    resourceType?: string;

    resourceId?: string;

    metadata?: any;

  }) {

    return this.prisma.audit_logs.create({

      data: {

        tenant_id:
          tenantId,

        user_id:
          userId,

        action,

        resource_type:
          resourceType,

        resource_id:
          resourceId,

        metadata,
      }
    });
  }
}
