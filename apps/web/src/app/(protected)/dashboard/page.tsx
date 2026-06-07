import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

export default function DashboardPage() {

  return (

    <PermissionGuard
      permission="dashboard"
    >

      <div>

        Dashboard

      </div>

    </PermissionGuard>
  );
}