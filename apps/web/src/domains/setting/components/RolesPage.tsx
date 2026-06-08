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

export default function
RolesPage() {

  const router =
    useRouter();

  const [
    roles,
    setRoles,
  ] = useState<Role[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState('');

  const [
    page,
    setPage,
  ] = useState(1);

  const pageSize = 10;

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
  ] = useState<Role | null>(
    null,
  );

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

      await createRole({

        tenant_id:
          payload?.tenant_id,

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

    await updateRole(
      id,
      data,
    );

    setEditOpen(
      false,
    );

    await loadRoles();
  }

  async function handleDeleteRole() {

    if (
      !selectedRole
    ) {
      return;
    }

    await deleteRole(
      selectedRole.id,
    );

    setDeleteOpen(
      false,
    );

    await loadRoles();
  }

  const filteredRoles =
    roles.filter(
      (role) => {

        const q =
          search.toLowerCase();

        return (

          role.name
            .toLowerCase()
            .includes(q)

          ||

          role.code
            .toLowerCase()
            .includes(q)

          ||

          role.description
            ?.toLowerCase()
            .includes(q)
        );
      },
    );

  const paginatedRoles =
    filteredRoles.slice(

      (page - 1) *
        pageSize,

      page *
        pageSize,
    );

  const totalPages =
    Math.ceil(

      filteredRoles.length /
        pageSize,
    );

  const columns = [

    {
      field: 'name',
      headerName:
        'Name',
    },

    {
      field: 'code',
      headerName:
        'Code',

      render:
        (row: Role) => (

          <Chip
            size="small"
            label={
              row.code
            }
          />

        ),
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
        (row: Role) => (

          <RoleActions

            onOpen={() => {

              router.push(
                `/setting/roles/${row.id}`,
              );
            }}

            onEdit={() => {

              setSelectedRole(
                row,
              );

              setEditOpen(
                true,
              );
            }}

            onDelete={() => {

              setSelectedRole(
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

      title="Roles"

      subtitle="Manage tenant roles and permissions"

    >

      <AppToolbar>

        <input

          placeholder="Search roles..."

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

            columns={
              columns
            }

            rows={
              paginatedRoles
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