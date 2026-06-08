import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import {
  PrismaService,
} from '../../../prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(

    private readonly prisma:
      PrismaService,

  ) {}

  async getAllUsers() {

    return this.prisma.user.findMany({

      where: {

        is_deleted: false,
      },

      orderBy: {

        email: 'asc',
      },
    });
  }

  async getUserById(
    id: string,
  ) {

    return this.prisma.user.findUnique({

      where: {
        id,
      },
    });
  }

  async createUser(
    data: {

      tenant_id: string;

      firstName?: string;

      lastName?: string;

      email: string;

      passwordHash?: string;
    },
  ) {

    const deletedUser =
      await this.prisma.user.findFirst({

        where: {

          tenant_id:
            data.tenant_id,

          email:
            data.email,

          is_deleted:
            true,
        },
      });

    if (
      deletedUser
    ) {

      return this.prisma.user.update({

        where: {

          id:
            deletedUser.id,
        },

        data: {

          is_deleted:
            false,

          firstName:
            data.firstName,

          lastName:
            data.lastName,

          passwordHash:
            data.passwordHash,
        },
      });
    }

    const existingUser =
      await this.prisma.user.findFirst({

        where: {

          tenant_id:
            data.tenant_id,

          email:
            data.email,

          is_deleted:
            false,
        },
      });

    if (
      existingUser
    ) {

      throw new BadRequestException(

        'User with this email already exists',
      );
    }

    return this.prisma.user.create({

      data: {

        tenant_id:
          data.tenant_id,

        firstName:
          data.firstName,

        lastName:
          data.lastName,

        email:
          data.email,

        passwordHash:
          data.passwordHash,
      },
    });
  }

  async updateUser(

    id: string,

    data: {

      firstName?: string;

      lastName?: string;

      email?: string;
    },
  ) {

    return this.prisma.user.update({

      where: {
        id,
      },

      data,
    });
  }

  async deleteUser(
    id: string,
  ) {

    return this.prisma.user.update({

      where: {
        id,
      },

      data: {

        is_deleted: true,
      },
    });
  }

  async getRoleUsers(
    roleId: string,
  ) {

    return this.prisma.userRole.findMany({

      where: {

        role_id: roleId,
      },

      include: {

        user: true,
      },
    });
  }

  async assignUserToRole(

    roleId: string,

    userId: string,
  ) {

    return this.prisma.userRole.create({

      data: {

        role_id: roleId,

        user_id: userId,
      },
    });
  }

  async removeUserFromRole(

    roleId: string,

    userId: string,
  ) {

    return this.prisma.userRole.deleteMany({

      where: {

        role_id: roleId,

        user_id: userId,
      },
    });
  }
  async getUserRoles(
  userId: string,
) {
  return this.prisma.userRole.findMany({
    where: {
      user_id: userId,
    },
    include: {
      role: true,
    },
  });
}

async getUserWorkspaces(
  userId: string,
) {

  return this.prisma.workspace_members.findMany({

    where: {

      user_id: userId,
    },

    include: {

      workspaces: true,
    },
  });
}

async assignWorkspaceToUser(

  userId: string,

  workspaceId: string,
) {

  return this.prisma.workspace_members.create({

    data: {

      user_id: userId,

      workspace_id: workspaceId,
    },
  });
}

async removeWorkspaceFromUser(

  userId: string,

  workspaceId: string,
) {

  return this.prisma.workspace_members.deleteMany({

    where: {

      user_id: userId,

      workspace_id: workspaceId,
    },
  });
}
}