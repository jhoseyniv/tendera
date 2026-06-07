import {

  Injectable,

} from '@nestjs/common';

import {

  PrismaService,

} from '../../../prisma/prisma.service';

@Injectable()
export class PermissionsService {

  constructor(

    private readonly prisma:
      PrismaService,

  ) {}

  async getRolePermissions(
    roleId: string,
  ) {

    return this.prisma.rolePagePermission.findMany({

      where: {

        role_id: roleId,
      },

      include: {

        pagePermission: true,
      },
    });
  }

  async assignPermission(

    roleId: string,

    pagePermissionId: string,
  ) {

    return this.prisma.rolePagePermission.create({

      data: {

        role_id: roleId,

        page_permission_id:
          pagePermissionId,
      },
    });
  }

  async removePermission(

    roleId: string,

    pagePermissionId: string,
  ) {

    return this.prisma.rolePagePermission.deleteMany({

      where: {

        role_id: roleId,

        page_permission_id:
          pagePermissionId,
      },
    });
  }

  async getAllPermissions() {

    return this.prisma.pagePermission.findMany({

      orderBy: {

        page_name: 'asc',
      },
    });
  }
}