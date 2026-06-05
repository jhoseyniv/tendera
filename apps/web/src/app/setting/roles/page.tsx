import PermissionGuard from '@/domains/permissions/guards/PermissionGuard';
import RolesPage from '@/domains/setting/components/RolesPage';

export default function Page() {
  return (
    <PermissionGuard permission="roles">
      <RolesPage />
    </PermissionGuard>
  );
}