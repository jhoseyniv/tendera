'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'next/navigation';

import {
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';

import AppPage
from '@/shared/components/layout/AppPage';

import {
  getUser,
} from '@/domains/users/api/users.api';

import UserRolesCard
from './cards/UserRolesCard';

import UserWorkspacesCard
from './cards/UserWorkspacesCard';

interface User {

  id: string;

  firstName?: string;

  lastName?: string;

  email: string;

  createdAt?: string;

  updatedAt?: string;
}

export default function
UserDetailsPage() {

  const params =
    useParams();

  const id =
    Array.isArray(
      params.id,
    )
      ? params.id[0]
      : params.id;

  const [
    user,
    setUser,
  ] = useState<User | null>(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    if (!id) {
      return;
    }

    async function loadUser() {

      try {

        const data =
          await getUser(
            id as string,
          );

        setUser(
          data,
        );

      } catch (error) {

        console.error(
          error,
        );

      } finally {

        setLoading(
          false,
        );
      }
    }

    loadUser();

  }, [id]);

  if (loading) {

    return (

      <AppPage
        title="User Details"
      >

        Loading...

      </AppPage>
    );
  }

  if (!user) {

    return (

      <AppPage
        title="User Details"
      >

        User not found

      </AppPage>
    );
  }

  return (

    <AppPage

      title={user.email}

      subtitle="Manage user roles and workspaces"

    >

      <div
        style={{
          display: 'flex',
          flexDirection:
            'column',
          gap: 24,
        }}
      >

        <Card>

          <CardContent>

            <Typography
              variant="h6"
            >
              User Information
            </Typography>

            <Divider
              sx={{
                my: 2,
              }}
            />

            <Typography>

              <strong>
                First Name:
              </strong>

              {' '}

              {user.firstName ||
                '-'}

            </Typography>

            <Divider
              sx={{
                my: 1,
              }}
            />

            <Typography>

              <strong>
                Last Name:
              </strong>

              {' '}

              {user.lastName ||
                '-'}

            </Typography>

            <Divider
              sx={{
                my: 1,
              }}
            />

            <Typography>

              <strong>
                Email:
              </strong>

              {' '}

              {user.email}

            </Typography>

          </CardContent>

        </Card>

        <UserRolesCard
          userId={user.id}
        />

        <UserWorkspacesCard
          userId={user.id}
        />

        <Card>

          <CardContent>

            <Typography
              variant="h6"
            >
              Audit Information
            </Typography>

            <Divider
              sx={{
                my: 2,
              }}
            />

            <Typography>

              <strong>
                Created At:
              </strong>

              {' '}

              {user.createdAt ||
                '-'}

            </Typography>

            <Divider
              sx={{
                my: 1,
              }}
            />

            <Typography>

              <strong>
                Updated At:
              </strong>

              {' '}

              {user.updatedAt ||
                '-'}

            </Typography>

          </CardContent>

        </Card>

      </div>

    </AppPage>

  );
}