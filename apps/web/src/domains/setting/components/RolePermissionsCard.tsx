'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';

import {

  getPermissions,

  getRolePermissions,

  assignPermission,

  removePermission,

} from '../api/permissions.api';

interface Props {

  roleId: string;
}

export default function
RolePermissionsCard({

  roleId,

}: Props) {

  const [permissions,
    setPermissions] =
    useState<any[]>([]);

  const [assigned,
    setAssigned] =
    useState<string[]>([]);

  async function loadData() {

    const all =
      await getPermissions();

    const rolePerms =
      await getRolePermissions(
        roleId,
      );

    setPermissions(all);

    setAssigned(

      rolePerms.map(
        (x: any) =>
          x.page_permission_id,
      ),
    );
  }

  useEffect(() => {

    loadData();

  }, [roleId]);

  async function handleToggle(

    permissionId: string,

    checked: boolean,
  ) {

    try {

      if (checked) {

        await assignPermission(

          roleId,

          permissionId,
        );

      } else {

        await removePermission(

          roleId,

          permissionId,
        );
      }

      await loadData();

    } catch (error) {

      console.error(error);
    }
  }

  return (

    <Card>

      <CardContent>

        <Typography
          variant="h6"
        >
          Permissions
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Grid
          container
          spacing={1}
        >

          {permissions.map(
            (permission) => (

              <Grid
                key={
                  permission.id
                }
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >

                <FormControlLabel

                  control={

                    <Checkbox

                      checked={
                        assigned.includes(
                          permission.id,
                        )
                      }

                      onChange={(
                        e,
                      ) =>
                        handleToggle(

                          permission.id,

                          e.target.checked,
                        )
                      }
                    />
                  }

                  label={
                    permission.page_name
                  }
                />

              </Grid>

            ),
          )}

        </Grid>

      </CardContent>

    </Card>
  );
}