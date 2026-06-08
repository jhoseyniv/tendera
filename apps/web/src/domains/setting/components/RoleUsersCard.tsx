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

  getUsers,

  getRoleUsers,

  assignUserToRole,

  removeUserFromRole,

} from '@/domains/users/api/users.api';

interface Props {

  roleId: string;
}

export default function
RoleUsersCard({

  roleId,

}: Props) {

  const [users,
    setUsers] =
    useState<any[]>([]);

  const [assigned,
    setAssigned] =
    useState<any[]>([]);

  const [selectedUser,
    setSelectedUser] =
    useState('');

  async function loadData() {

    try {

      const allUsers =
        await getUsers();

      const roleUsers =
        await getRoleUsers(
          roleId,
        );

      setUsers(
        allUsers,
      );

      setAssigned(
        roleUsers,
      );

    } catch (error) {

      console.error(
        error,
      );
    }
  }

  useEffect(() => {

    loadData();

  }, [roleId]);

  async function handleAssign() {

    if (!selectedUser) {

      return;
    }

    try {

      await assignUserToRole(

        roleId,

        selectedUser,
      );

      setSelectedUser('');

      await loadData();

    } catch (error) {

      console.error(
        error,
      );
    }
  }

  async function handleRemove(
    userId: string,
  ) {

    try {

      await removeUserFromRole(

        roleId,

        userId,
      );

      await loadData();

    } catch (error) {

      console.error(
        error,
      );
    }
  }

  const availableUsers =
    users.filter(
      (user) =>

        !assigned.some(
          (item: any) =>

            item.user_id ===
            user.id,
        ),
    );

  return (

    <Card>

      <CardContent>

        <Typography
          variant="h6"
        >
          Assigned Users
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
              selectedUser
            }

            onChange={(e) =>
              setSelectedUser(
                e.target.value,
              )
            }

            fullWidth

            displayEmpty
          >

            <MenuItem
              value=""
            >
              Select User
            </MenuItem>

            {availableUsers.map(
              (user) => (

                <MenuItem

                  key={
                    user.id
                  }

                  value={
                    user.id
                  }
                >

                  {user.email}

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
              !selectedUser
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
                  item.user.id
                }

                secondaryAction={

                  <Button

                    color="error"

                    onClick={() =>
                      handleRemove(

                        item.user.id,
                      )
                    }
                  >

                    Remove

                  </Button>

                }
              >

                <ListItemText

                  primary={
                    item.user.email
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