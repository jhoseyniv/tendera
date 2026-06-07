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
  Typography,
  Divider,
  Grid,
} from '@mui/material';

import AppPage
from '@/shared/components/layout/AppPage';

import {
  getRoleById,
} from '../api/roles.api';

import RolePermissionsCard
from './RolePermissionsCard';

interface Role {

  id: string;

  tenant_id: string;

  name: string;

  code: string;

  description?: string;

  created_at?: string;

  updated_at?: string;
}

export default function
RoleDetailsPage() {

  const params =
    useParams();

  const [role, setRole] =
    useState<Role | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadRole() {

      try {

        const data =
          await getRoleById(
            params.id as string,
          );

        setRole(data);

      } catch (error) {

        console.error(
          error,
        );

      } finally {

        setLoading(false);
      }
    }

    if (params.id) {

      loadRole();
    }

  }, [params.id]);

  if (loading) {

    return (

      <AppPage
        title="Role Details"
      >

        Loading...

      </AppPage>
    );
  }

  if (!role) {

    return (

      <AppPage
        title="Role Details"
      >

        Role not found

      </AppPage>
    );
  }

  return (

    <AppPage

      title={role.name}

      subtitle="Manage role permissions"

    >

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
          }}
        >

          <Card>

            <CardContent>

              <Typography
                variant="h6"
              >
                Role Information
              </Typography>

              <Divider
                sx={{
                  my: 2,
                }}
              />

              <Typography>
                Name
              </Typography>

              <Typography>
                {role.name}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                Code
              </Typography>

              <Typography>
                {role.code}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                Description
              </Typography>

              <Typography>
                {role.description ||
                  '-'}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >

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

              <Typography>

                Coming Soon

              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >

          <RolePermissionsCard
            roleId={role.id}
          />

        </Grid>

      </Grid>

    </AppPage>

  );
}