import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MeService {
  constructor(private prisma: PrismaService) {}

  /**
   * برمی‌گرداند لیست صفحات قابل دسترسی برای یک کاربر
   * شامل RBAC براساس نقش‌ها و دسترسی‌های مرتبط
   */
  async getPagesForUser(userId: string) {
    // گرفتن نقش‌ها و صفحات مرتبط با هر نقش
    const userRoles = await this.prisma.userRole.findMany({
      where: { user_id: userId },
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

    // Map برای حذف صفحات تکراری
    const pagesMap = new Map<string, any>();

    for (const ur of userRoles) {
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

    // تبدیل Map به Array و مرتب‌سازی بر اساس sort_order
    const pages = Array.from(pagesMap.values()).sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );

    // خروجی آماده Sidebar و PermissionGuard
    return pages;
  }
}