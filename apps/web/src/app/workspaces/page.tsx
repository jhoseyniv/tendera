import PermissionGuard from '@/domains/permissions/guards/PermissionGuard';
import WorkspacesPage from '@/domains/workspaces/components/WorkspacesPage';

export default function Page() {
  return (
    <PermissionGuard permission="workspaces">
      <WorkspacesPage />
    </PermissionGuard>
  );
}