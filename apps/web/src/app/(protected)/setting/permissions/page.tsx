import PermissionsPage
from '@/domains/setting/components/PermissionsPage';

import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

export default function Page() {

  return (

    <PermissionGuard
      permission="permissions"
    >

      <PermissionsPage />

    </PermissionGuard>

  );
}