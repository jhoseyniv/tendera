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
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

import {
  getRoles,
} from '@/domains/setting/api/roles.api';

import {
  getUserRoles,
  assignUserToRole,
  removeUserFromRole,
} from '@/domains/users/api/users.api';

interface Props {

  userId: string;
}

export default function
UserRolesCard({

  userId,

}: Props) {

  const [
    roles,
    setRoles,
  ] = useState<any[]>([]);

  const [
    assigned,
    setAssigned,
  ] = useState<any[]>([]);

  const [
    selectedRole,
    setSelectedRole,
  ] = useState('');

  async function
  loadData() {

    try {

      const allRoles =
        await getRoles();
      const userRoles =
        await getUserRoles(
          userId,
        );

      setRoles(
        allRoles,
      );

      setAssigned(
        userRoles,
      );
      console.log(
  'userRoles',
  userRoles,
);

    } catch (
      error
    ) {

      console.error(
        error,
      );
    }
  }

  useEffect(() => {

    loadData();

  }, [userId]);

  async function
  handleAssign() {

    if (
      !selectedRole
    ) {

      return;
    }

    try {

      await assignUserToRole(

        selectedRole,

        userId,
      );

      setSelectedRole(
        '',
      );

      await loadData();

    } catch (
      error
    ) {

      console.error(
        error,
      );
    }
  }

  async function
  handleRemove(
    roleId: string,
  ) {

    try {

      await removeUserFromRole(

        roleId,

        userId,
      );

      await loadData();

    } catch (
      error
    ) {

      console.error(
        error,
      );
    }
  }

  const availableRoles =
    roles.filter(
      (role) =>

        !assigned.some(
          (item: any) =>

            item.role_id ===
            role.id,
        ),
    );

    
  return (

    <Card>

      <CardContent>

        <Typography
          variant="h6"
        >

          Assigned Roles

        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
          }}
        >

          <Select

            value={
              selectedRole
            }

            onChange={(e) =>
              setSelectedRole(
                String(
                  e.target.value,
                ),
              )
            }

            fullWidth

            displayEmpty
          >

            <MenuItem
              value=""
            >

              Select Role

            </MenuItem>

            {availableRoles.map(
              (role) => (

                <MenuItem

                  key={
                    role.id
                  }

                  value={
                    role.id
                  }
                >

                  {role.name}

                </MenuItem>

              ),
            )}

          </Select>

          <Button

            variant="contained"

            onClick={
              handleAssign
            }

            disabled={
              !selectedRole
            }
          >

            Assign

          </Button>

        </Box>

        <List>

          {assigned.map(
            (item: any) => (

              <ListItem

                key={
                  item.role.id
                }

                secondaryAction={

                  <Button

                    color="error"

                    onClick={() =>
                      handleRemove(
                        item.role.id,
                      )
                    }
                  >

                    Remove

                  </Button>

                }
              >

                <ListItemText

                  primary={
                    item.role.name
                  }

                />

              </ListItem>

            ),
          )}

        </List>

      </CardContent>

    </Card>

  );
}