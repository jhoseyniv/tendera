'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Card,
  CardContent,
  Divider,
  Button,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';

import {
  getPermissionRoles,
  assignRoleToPermission,
  removeRoleFromPermission,
} from './../api/permissions.api';

import {
  getRoles,
} from './../api/roles.api';

interface Props {

  permissionId: string;
}

export default function
PermissionRolesCard({

  permissionId,
}: Props) {

  const [
    roles,
    setRoles,
  ] = useState<any[]>([]);

  const [
    availableRoles,
    setAvailableRoles,
  ] = useState<any[]>([]);

  const [
    selectedRole,
    setSelectedRole,
  ] = useState('');

  async function
  loadRoles() {

    const data =
      await getPermissionRoles(
        permissionId,
      );

    setRoles(
      data,
    );
  }

  async function
  loadAvailableRoles() {

    const data =
      await getRoles();

    setAvailableRoles(
      data,
    );
  }

  useEffect(() => {

    loadRoles();

    loadAvailableRoles();

  }, [permissionId]);

  async function
  handleAssign() {

    if (!selectedRole) {
      return;
    }

    await assignRoleToPermission(

      permissionId,

      selectedRole,
    );

    setSelectedRole('');

    await loadRoles();
  }

  async function
  handleRemove(
    roleId: string,
  ) {

    await removeRoleFromPermission(

      permissionId,

      roleId,
    );

    await loadRoles();
  }

  const assignedRoleIds =
    roles.map(
      item =>
        item.role.id,
    );

  const unassignedRoles =
    availableRoles.filter(
      role =>
        !assignedRoleIds.includes(
          role.id,
        ),
    );

  return (

    <Card>

      <CardContent>

        <h3>

          Assigned Roles

        </h3>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 3,
          }}
        >

          <Select
            value={
              selectedRole
            }
            onChange={
              e =>
                setSelectedRole(
                  e.target.value,
                )
            }
            size="small"
            sx={{
              minWidth: 250,
            }}
          >

            {unassignedRoles.map(
              role => (

                <MenuItem
                  key={
                    role.id
                  }
                  value={
                    role.id
                  }
                >

                  {
                    role.name
                  }

                </MenuItem>
              ),
            )}

          </Select>

          <Button
            variant="contained"
            onClick={
              handleAssign
            }
          >

            Add Role

          </Button>

        </Stack>

        {roles.length === 0 ? (

          <div>

            No roles assigned

          </div>

        ) : (

          roles.map(
            item => (

              <div
                    key={item.role.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >

                <strong>

                  {
                    item.role.name
                  }

                </strong>

                <Button
                  color="error"
                  size="small"
                  onClick={() =>
                    handleRemove(
                      item.role.id,
                    )
                  }
                >

                  Remove

                </Button>

              </div>

            ),
          )

        )}

      </CardContent>

    </Card>
  );
}