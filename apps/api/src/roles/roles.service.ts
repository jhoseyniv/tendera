import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  PrismaService
} from '../../prisma/prisma.service';

@Injectable()
export class RolesService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async findAll() {

    return this.prisma.role.findMany({

      orderBy: {
        name: 'asc'
      }
    });
  }

  async findOne(id: string) {

    const role =
      await this.prisma.role.findUnique({

        where: {
          id
        }
      });

    if (!role) {

      throw new NotFoundException(
        'Role not found'
      );
    }

    return role;
  }

  async createRole(
    data: any,
    createdBy: string
  ) {

    return this.prisma.role.create({

      data: {

        tenant_id:
          data.tenant_id,

        name:
          data.name,

        code:
          data.code,

        description:
          data.description,

        created_by:
          createdBy
      }
    });
  }

  async updateRole(
    id: string,
    data: any,
    updatedBy: string
  ) {

    return this.prisma.role.update({

      where: {
        id
      },

      data: {

        ...data,

        updated_by:
          updatedBy
      }
    });
  }

  async deleteRole(id: string) {

    return this.prisma.role.delete({

      where: {
        id
      }
    });
  }
}