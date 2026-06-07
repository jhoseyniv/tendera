'use client';

import {
useEffect,
useState,
} from 'react';

import {
Button,
Chip,
} from '@mui/material';

import AppPage
from '@/shared/components/layout/AppPage';

import AppToolbar
from '@/shared/components/actions/AppToolbar';

import AppTable
from '@/shared/components/data/AppTable';

import AIActionPanel
from '@/shared/components/ai/AIActionPanel';
import { useRouter }
from 'next/navigation';
import {
getRoles,
createRole,
updateRole,
deleteRole,
} from '../api/roles.api';

import CreateRoleDialog
from './dialogs/CreateRoleDialog';

import EditRoleDialog
from './dialogs/EditRoleDialog';

import DeleteRoleDialog
from './dialogs/DeleteRoleDialog';

import RoleActions
from './RoleActions';

import {
getJwtPayload,
} from '@/shared/utils/jwt';

interface Role {

id: string;

tenant_id?: string;

name: string;

code: string;

description?: string;
}

export default function RolesPage() {

const [
roles,
setRoles,
] = useState<Role[]>([]);

const [
loading,
setLoading,
] = useState(false);

const [
createOpen,
setCreateOpen,
] = useState(false);

const [
editOpen,
setEditOpen,
] = useState(false);

const [
deleteOpen,
setDeleteOpen,
] = useState(false);

const [
selectedRole,
setSelectedRole,
] = useState<Role | null>(null);

useEffect(() => {
loadRoles();

}, []);

async function loadRoles() {

try {

  setLoading(true);

  const data =
    await getRoles();

  setRoles(data);

} catch (error) {

  console.error(
    'Load roles failed',
    error,
  );

} finally {

  setLoading(false);
}

}

async function handleCreateRole(
data: {
name: string;
code: string;
description: string;
},
) {

try {

  const payload =
    getJwtPayload();

  if (!payload?.tenant_id) {

    throw new Error(
      'Tenant ID not found in token',
    );
  }

  await createRole({

    tenant_id:
      payload.tenant_id,

    name:
      data.name,

    code:
      data.code,

    description:
      data.description,
  });

  await loadRoles();

} catch (error) {

  console.error(
    'Create role failed',
    error,
  );
}

}

async function handleEditRole(
id: string,
data: {
name: string;
code: string;
description: string;
},
) {

try {

  await updateRole(
    id,
    data,
  );

  setEditOpen(
    false,
  );

  setSelectedRole(
    null,
  );

  await loadRoles();

} catch (error) {

  console.error(
    'Update role failed',
    error,
  );
}

}

async function handleDeleteRole() {

if (
  !selectedRole
) {
  return;
}

try {

  await deleteRole(
    selectedRole.id,
  );

  setDeleteOpen(
    false,
  );

  setSelectedRole(
    null,
  );

  await loadRoles();

} catch (error) {

  console.error(
    'Delete role failed',
    error,
  );
}

}
const router =
  useRouter();
const columns = [

{
  field: 'name',

  headerName: 'Name',
},

{
  field: 'code',

  headerName: 'Code',

  render:
    (row: Role) => (

      <Chip
        size="small"
        label={row.code}
      />

    ),
},

{
  field: 'description',

  headerName:
    'Description',
},

{
  field: 'actions',

  headerName:
    'Actions',

  render:
    (row: Role) => (

     <RoleActions

  onOpen={() => {

    router.push(
      `/setting/roles/${row.id}`,
    );
  }}

  onEdit={() => {

    setSelectedRole(row);

    setEditOpen(true);
  }}

  onDelete={() => {

    setSelectedRole(row);

    setDeleteOpen(true);
  }}

/>

    ),
},

];

return (

<AppPage

  title="Roles"

  subtitle="

Manage tenant roles and permissions"

>

  <AppToolbar>

    <Button
      variant="contained"
      onClick={() =>
        setCreateOpen(
          true,
        )
      }
    >

      Add Role

    </Button>

  </AppToolbar>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns:
        '1fr 350px',
      gap: 24,
    }}
  >

    <div>

      <AppTable
        columns={columns}
        rows={roles}
      />

    </div>

    <div>

      <AIActionPanel />

    </div>

  </div>

  <CreateRoleDialog

    open={createOpen}

    onClose={() =>
      setCreateOpen(
        false,
      )
    }

    onSave={
      handleCreateRole
    }

  />

  <EditRoleDialog

    open={editOpen}

    role={
      selectedRole ||
      undefined
    }

    onClose={() =>
      setEditOpen(
        false,
      )
    }

    onSave={
      handleEditRole
    }

  />

  <DeleteRoleDialog

    open={deleteOpen}

    roleName={
      selectedRole?.name
    }

    onClose={() =>
      setDeleteOpen(
        false,
      )
    }

    onConfirm={
      handleDeleteRole
    }

  />

</AppPage>

);
}
