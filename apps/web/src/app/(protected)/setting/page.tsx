import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

export default function WorkspacesPage() {

  return (

    <PermissionGuard
      permission="workspaces"
    >

      <div>

        Workspaces Page

      </div>

    </PermissionGuard>
  );
}