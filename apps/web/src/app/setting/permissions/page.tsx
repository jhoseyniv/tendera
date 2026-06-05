'use client';

import PermissionGuard from '@/domains/permissions/guards/PermissionGuard';

export default function PermissionsPage() {

  return (

    <PermissionGuard
      permission="permissions"
    >

      <div>

        <h1>

          Permissions Page

        </h1>

      </div>

    </PermissionGuard>
  );
}
