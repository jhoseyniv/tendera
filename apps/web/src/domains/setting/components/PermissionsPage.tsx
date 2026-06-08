'use client';

import {
useEffect,
useState,
} from 'react';

import {
Button,
Chip,
} from '@mui/material';

import {
  useRouter,
} from 'next/navigation';

import AppPage
from '@/shared/components/layout/AppPage';

import AppToolbar
from '@/shared/components/actions/AppToolbar';

import AppTable
from '@/shared/components/data/AppTable';

import AIActionPanel
from '@/shared/components/ai/AIActionPanel';

import {
getPermissions,
createPermission,
updatePermission,
deletePermission,
} from '../api/permissions.api';

import PermissionActions
from '../components/PermissionActions';

import CreatePermissionDialog
from '../components/dialogs/CreatePermissionDialog';

import EditPermissionDialog
from '../components/dialogs/EditPermissionDialog';

import DeletePermissionDialog
from '../components/dialogs/DeletePermissionDialog';

interface Permission {

id: string;

page_code: string;

page_name: string;

route_path: string;

description?: string;
}

export default function
PermissionsPage() {

  const router =
  useRouter();

const [
permissions,
setPermissions,
] = useState<
Permission[]

> ([]);

const [
search,
setSearch,
] = useState('');

const [
page,
setPage,
] = useState(1);

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
selectedPermission,
setSelectedPermission,
] = useState<Permission | null>(
null,
);

const pageSize = 10;

async function
loadPermissions() {
console.log(
  'Loading permissions...',
);
try {

  const data =
    await getPermissions();
    console.log(
  'Permissions loaded',
  data,
);
  setPermissions(
    data,
  );

} catch (error) {

  console.error(
    error,
  );
}

}

useEffect(() => {

loadPermissions();

}, []);

const filteredPermissions =
permissions.filter(
(permission) => {

    const q =
      search.toLowerCase();

    return (

      permission.page_name
        .toLowerCase()
        .includes(q)

      ||

      permission.page_code
        .toLowerCase()
        .includes(q)

      ||

      permission.route_path
        .toLowerCase()
        .includes(q)
    );
  },
);

const paginatedPermissions =
filteredPermissions.slice(

  (page - 1) *
    pageSize,

  page *
    pageSize,
);

const totalPages =
Math.ceil(

  filteredPermissions.length /
    pageSize,
);

const columns = [

{
  field:
    'page_name',

  headerName:
    'Page Name',
},

{
  field:
    'page_code',

  headerName:
    'Code',

  render:
    (
      row:
        Permission,
    ) => (

      <Chip
        size="small"
        label={
          row.page_code
        }
      />

    ),
},

{
  field:
    'route_path',

  headerName:
    'Route',
},

{
  field:
    'description',

  headerName:
    'Description',
},

{
  field:
    'actions',

  headerName:
    'Actions',

  render:
    (
      row:
        Permission,
    ) => (

      <PermissionActions

       onOpen={() => {

  router.push(
    `/setting/permissions/${row.id}`,
  );
}}

        onEdit={() => {

          setSelectedPermission(
            row,
          );

          setEditOpen(
            true,
          );
        }}

        onDelete={() => {

          setSelectedPermission(
            row,
          );

          setDeleteOpen(
            true,
          );
        }}

      />

    ),
},

];

return (

<AppPage

  title="Permissions"

  subtitle="Manage page permissions"

>

  <AppToolbar>

    <input

      placeholder="Search permissions..."

      value={search}

      onChange={(e) => {

        setSearch(
          e.target.value,
        );

        setPage(1);
      }}

      style={{

        width: 280,

        padding: 10,

        border:
          '1px solid #ddd',

        borderRadius: 8,
      }}
    />

    <Button

      variant="contained"

      onClick={() =>
        setCreateOpen(
          true,
        )
      }
    >

      Add Permission

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

        columns={
          columns
        }

        rows={
          paginatedPermissions
        }

      />

      <div
        style={{

          display: 'flex',

          justifyContent:
            'space-between',

          marginTop: 16,
        }}
      >

        <Button

          disabled={
            page === 1
          }

          onClick={() =>
            setPage(
              page - 1,
            )
          }
        >

          Previous

        </Button>

        <span>

          Page {page}
          {' / '}
          {totalPages || 1}

        </span>

        <Button

          disabled={
            page >=
            totalPages
          }

          onClick={() =>
            setPage(
              page + 1,
            )
          }
        >

          Next

        </Button>

      </div>

    </div>

    <AIActionPanel />

  </div>

  <CreatePermissionDialog

    open={createOpen}

    onClose={() =>
      setCreateOpen(
        false,
      )
    }

    onSave={async (
      data,
    ) => {

      await createPermission(
        data,
      );

      await loadPermissions();
    }}

  />

  <EditPermissionDialog

    open={editOpen}

    permission={
      selectedPermission ||
      undefined
    }

    onClose={() =>
      setEditOpen(
        false,
      )
    }

    onSave={async (
      id,
      data,
    ) => {

      await updatePermission(

        id,

        data,
      );

      setEditOpen(
        false,
      );

      await loadPermissions();
    }}

  />

  <DeletePermissionDialog

    open={deleteOpen}

    permissionName={
      selectedPermission?.page_name
    }

    onClose={() =>
      setDeleteOpen(
        false,
      )
    }

    onConfirm={async () => {

      if (
        !selectedPermission
      ) {
        return;
      }

      await deletePermission(

        selectedPermission.id,
      );

      setDeleteOpen(
        false,
      );

      await loadPermissions();
    }}

  />

</AppPage>

);
}
