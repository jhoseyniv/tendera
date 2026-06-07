import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MeService {
  constructor(private prisma: PrismaService) {}

  async getPagesForUser(userId: string) {

    const pagesMap = new Map<string, any>();

    //
    // Tenant Roles
    //
    const tenantRoles =
      await this.prisma.userRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          role: {
            include: {
              rolePagePermissions: {
                include: {
                  pagePermission: true,
                },
              },
            },
          },
        },
      });

    for (const ur of tenantRoles) {

      for (const rpp of ur.role.rolePagePermissions) {

        const p = rpp.pagePermission;

        if (!pagesMap.has(p.id)) {

          pagesMap.set(p.id, {
            id: p.id,
            page_code: p.page_code,
            page_name: p.page_name,
            route_path: p.route_path,
            parent_id: p.parent_id,
            icon: p.icon,
            sort_order: p.sort_order,
          });
        }
      }
    }

    //
    // Platform Roles
    //
    console.log('USER ID:', userId);
    const platformRoles =
      await this.prisma.platformUserRole.findMany({
        where: {
          user_id: userId,
        },
        include: {
          platformRole: {
            include: {
              rolePagePermissions: {
                include: {
                  pagePermission: true,
                },
              },
            },
          },
        },
      });

    for (const pur of platformRoles) {

      for (const prpp of pur.platformRole.rolePagePermissions) {

        const p = prpp.pagePermission;

        if (!pagesMap.has(p.id)) {

          pagesMap.set(p.id, {
            id: p.id,
            page_code: p.page_code,
            page_name: p.page_name,
            route_path: p.route_path,
            parent_id: p.parent_id,
            icon: p.icon,
            sort_order: p.sort_order,
          });
        }
      }
    }

    console.log(
  'PLATFORM ROLES:',
  JSON.stringify(platformRoles, null, 2)
);

    const pages =
      Array
        .from(pagesMap.values())
        .sort(
          (a, b) =>
            (a.sort_order || 0) -
            (b.sort_order || 0),
        );

    return pages;
  }
}