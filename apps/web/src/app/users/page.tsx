import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

export default function UsersPage() {

  return (

    <PermissionGuard
      permission="users"
    >

      <div>

        Users Page

      </div>

    </PermissionGuard>
  );
}