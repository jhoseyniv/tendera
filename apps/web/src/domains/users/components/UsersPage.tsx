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

import {
  createUser,
  updateUser,
  deleteUser,
  getUserRoles,
  getUsers,
} from '@/domains/users/api/users.api';

import CreateUserDialog
from './dialogs/CreateUserDialog';

import EditUserDialog
from './dialogs/EditUserDialog';

import DeleteUserDialog
from './dialogs/DeleteUserDialog';

import UserDetailsDialog
from './UserDetailsDialog';

import UserActions
from './UserActions';

import {
  getTenantId,
} from '@/shared/utils/jwt';

export default function UsersPage() {

  const [
    users,
    setUsers,
  ] = useState<any[]>([]);

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

  const [
    selectedUser,
    setSelectedUser,
  ] = useState<any>(
    null,
  );

  const [
    dialogOpen,
    setDialogOpen,
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

  const pageSize = 10;

  async function loadUsers() {

    try {

      setLoading(
        true,
      );

      const data =
        await getUsers();

      setUsers(
        data,
      );

    } catch (
      error
    ) {

      console.error(
        error,
      );

    } finally {

      setLoading(
        false,
      );
    }
  }

  useEffect(() => {

    loadUsers();

  }, []);

  async function
  handleOpenUser(
    user: any,
  ) {

    try {

      const roles =
        await getUserRoles(
          user.id,
        );

      setSelectedUser({

        ...user,

        roles:
          roles.map(
            (
              item: any,
            ) =>
              item.role,
          ),
      });

      setDialogOpen(
        true,
      );

    } catch (
      error
    ) {

      console.error(
        error,
      );

      setSelectedUser(
        user,
      );

      setDialogOpen(
        true,
      );
    }
  }

  const filteredUsers =
    users.filter(
      user => {

        const q =
          search.toLowerCase();

        return (

          (user.email ?? '')
            .toLowerCase()
            .includes(q)

          ||

          (
            user.name ??
            ''
          )
            .toLowerCase()
            .includes(q)
        );
      },
    );

  const paginatedUsers =
    filteredUsers.slice(

      (page - 1) *
      pageSize,

      page *
      pageSize,
    );

  const totalPages =
    Math.max(

      1,

      Math.ceil(

        filteredUsers.length /

        pageSize,
      ),
    );

  const columns = [

    {
      field:
        'email',

      headerName:
        'Email',
    },

    {
      field:
        'name',

      headerName:
        'Name',
    },

    {
      field:
        'status',

      headerName:
        'Status',

      render:
        (
          row: any,
        ) => (

          <Chip
            size="small"
            color={
              row.is_active
                ? 'success'
                : 'default'
            }
            label={
              row.is_active
                ? 'Active'
                : 'Inactive'
            }
          />

        ),
    },

    {
      field:
        'actions',

      headerName:
        'Actions',

      render:
        (
          row: any,
        ) => (

          <UserActions

            onOpen={() =>
              handleOpenUser(
                row,
              )
            }

            onEdit={() => {

              setSelectedUser(
                row,
              );

              setEditOpen(
                true,
              );
            }}

            onDelete={() => {

              setSelectedUser(
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

      title="Users"

      subtitle="Manage users"

    >

      <AppToolbar>

        <input

          placeholder="Search users..."

          value={search}

          onChange={(e) => {

            setSearch(
              e.target.value,
            );

            setPage(
              1,
            );
          }}

          style={{

            width: 280,

            padding: 10,

            border:
              '1px solid #ddd',

            borderRadius:
              8,
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
          Add User
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

          {loading ? (

            <div>
              Loading...
            </div>

          ) : (

            <AppTable

              columns={
                columns
              }

              rows={
                paginatedUsers
              }

            />

          )}

          <div
            style={{

              display:
                'flex',

              justifyContent:
                'space-between',

              marginTop:
                16,
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
              {totalPages}

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

      <UserDetailsDialog

        open={
          dialogOpen
        }

        onClose={() =>
          setDialogOpen(
            false,
          )
        }

        user={
          selectedUser
        }

      />

      <CreateUserDialog

        open={createOpen}

        onClose={() =>
          setCreateOpen(
            false,
          )
        }

        onSave={async (
          data,
        ) => {

          await createUser({

            tenant_id:
              getTenantId(),

            ...data,
          });

          await loadUsers();
        }}

      />

      <EditUserDialog

        open={editOpen}

        user={selectedUser}

        onClose={() =>
          setEditOpen(
            false,
          )
        }

        onSave={async (
          id,
          data,
        ) => {

          await updateUser(
            id,
            data,
          );

          setEditOpen(
            false,
          );

          await loadUsers();
        }}

      />

      <DeleteUserDialog

        open={deleteOpen}

        userName={
          selectedUser?.email
        }

        onClose={() =>
          setDeleteOpen(
            false,
          )
        }

        onConfirm={async () => {

          if (
            !selectedUser
          ) {
            return;
          }

          await deleteUser(
            selectedUser.id,
          );

          setDeleteOpen(
            false,
          );

          await loadUsers();
        }}

      />

    </AppPage>

  );
}