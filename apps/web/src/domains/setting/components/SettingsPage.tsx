import PermissionGuard
from '@/domains/permissions/guards/PermissionGuard';

export default function SettingsPage() {

  return (

    <PermissionGuard
      permission="settings"
    >

      <div>

        Settings Page

      </div>

    </PermissionGuard>
  );
}