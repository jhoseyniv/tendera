import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

import RoleDetailsPage
from '@/domains/setting/components/RoleDetailsPage';

export default function Page() {

  return (

    <PermissionGuard
      permission="roles"
    >

      <RoleDetailsPage />

    </PermissionGuard>

  );
}