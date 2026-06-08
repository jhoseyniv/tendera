'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Card,
  CardContent,
  Divider,
} from '@mui/material';

import {
  getPermissionUsers,
} from '../api/permissions.api';

interface Props {

  permissionId: string;
}

export default function
PermissionUsersCard({

  permissionId,
}: Props) {

  const [
    users,
    setUsers,
  ] = useState<any[]>([]);

  useEffect(() => {

    async function loadUsers() {

      const data =
        await getPermissionUsers(
          permissionId,
        );

      setUsers(
        data,
      );
    }

    loadUsers();

  }, [permissionId]);

  return (

    <Card>

      <CardContent>

        <h3>

          Assigned Users

        </h3>

        <Divider
          sx={{
            my: 2,
          }}
        />

        {users.length === 0 ? (

          <div>

            No users assigned

          </div>

        ) : (

          users.map(
            user => (

              <div
                key={user.id}
                style={{
                  marginBottom:
                    12,
                }}
              >

                <strong>

                  {user.email}

                </strong>

              </div>

            ),
          )

        )}

      </CardContent>

    </Card>

  );
}