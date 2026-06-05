import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTenant(
  data: any,
  createdBy: string,
) {

  const slug =
    data.name
      .toLowerCase()
      .replace(/\s+/g, '-');

  const tenant =
    await this.prisma.tenants.create({

      data: {
        name: data.name,
        primary_domain:
          data.primary_domain,

        normalized_name:
          data.name.toLowerCase(),

        slug,

        created_by:
          createdBy,
      },
    });

  await this.prisma.usage_counters.create({

    data: {
      tenant_id:
        tenant.id,

      ai_tokens_used: 0,

      storage_used_bytes: 0,

      workspace_count: 0,

      user_count: 0,

      updated_at:
        new Date(),
    },
  });

  return tenant;
}

  async findAll() {
    return this.prisma.tenants.findMany();
  }

  async findOne(id: string) {
    return this.prisma.tenants.findUnique({ where: { id } });
  }

  async updateTenant(id: string, data: any, updatedBy: string) {
    return this.prisma.tenants.update({
      where: { id },
      data: {
        ...data,
        updated_by: updatedBy,
        updated_at: new Date()
      }
    });
  }

  async deleteTenant(id: string, deletedBy: string) {
    return this.prisma.tenants.update({
      where: { id },
      data: {
        is_active: false,
        updated_by: deletedBy,
        updated_at: new Date()
      }
    });
  }
}