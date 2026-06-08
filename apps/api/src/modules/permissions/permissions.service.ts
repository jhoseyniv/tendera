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
  async getPermissionById(
  id: string,
) {

  return this.prisma.pagePermission.findUnique({

    where: {
      id,
    },
  });
}

async createPermission(
  data: any,
) {

  return this.prisma.pagePermission.create({

    data,
  });
}

async updatePermission(

  id: string,

  data: any,
) {

  return this.prisma.pagePermission.update({

    where: {
      id,
    },

    data,
  });
}

async deletePermission(
  id: string,
) {

  return this.prisma.pagePermission.delete({

    where: {
      id,
    },
  });
}

async getPermissionRoles(
  permissionId: string,
) {

  return this.prisma.rolePagePermission.findMany({

    where: {

      page_permission_id:
        permissionId,
    },

    include: {

      role: true,
    },
  });
}


async getPermissionUsers(
  permissionId: string,
) {

  const roles =
    await this.prisma.rolePagePermission.findMany({

      where: {
        page_permission_id:
          permissionId,
      },

      include: {

        role: {

          include: {

            userRoles: {

              include: {

                user: true,
              },
            },
          },
        },
      },
    });

  const users =
    roles.flatMap(
      rolePermission =>

        rolePermission.role.userRoles.map(
          userRole =>
            userRole.user,
        ),
    );

  const uniqueUsers =
    users.filter(

      (
        user,
        index,
        self,
      ) =>

        index ===
        self.findIndex(
          u =>
            u.id ===
            user.id,
        ),
    );

  return uniqueUsers;
}
async assignRoleToPermission(
  permissionId: string,
  roleId: string,
) {

  return this.prisma.rolePagePermission.create({

    data: {

      role_id: roleId,

      page_permission_id:
        permissionId,
    },
  });
}

async removeRoleFromPermission(
  permissionId: string,
  roleId: string,
) {

  return this.prisma.rolePagePermission.deleteMany({

    where: {

      role_id: roleId,

      page_permission_id:
        permissionId,
    },
  });
}
}