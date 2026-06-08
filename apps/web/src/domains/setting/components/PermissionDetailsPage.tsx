'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';

import AppPage from '@/shared/components/layout/AppPage';

import {
  getPermissionById,
} from '../api/permissions.api';

import PermissionUsersCard from '../components/PermissionUsersCard';
import PermissionRolesCard from '../components/PermissionRolesCard';

interface Permission {
  id: string;
  page_code: string;
  page_name: string;
  route_path?: string;
  description?: string;
  parent_id?: string | null;
  icon?: string | null;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export default function PermissionDetailsPage() {

  const params = useParams();

  const id =
    Array.isArray(params.id)
      ? params.id[0]
      : params.id;

  const [permission, setPermission] =
    useState<Permission | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) {
      return;
    }

    async function loadPermission() {

      try {

        const data =
          await getPermissionById(
            id as string,
          );

        setPermission(data);

      } catch (err) {

        console.error(
          'Failed to load permission:',
          err,
        );

      } finally {

        setLoading(false);

      }
    }

    loadPermission();

  }, [id]);

  if (loading) {

    return (
      <AppPage title="Permission Details">
        Loading...
      </AppPage>
    );
  }

  if (!permission) {

    return (
      <AppPage title="Permission Details">
        Permission not found
      </AppPage>
    );
  }

  return (

    <AppPage
      title={permission.page_name}
      subtitle="Permission Details"
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >

        <Card>

          <CardContent>

            <Typography variant="h6">
              Permission Information
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Name:</strong>{' '}
              {permission.page_name}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Code:</strong>{' '}
              {permission.page_code}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Route:</strong>{' '}
              {permission.route_path || '-'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Description:</strong>{' '}
              {permission.description || '-'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Parent Permission:</strong>{' '}
              {permission.parent_id || '-'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Icon:</strong>{' '}
              {permission.icon || '-'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Sort Order:</strong>{' '}
              {permission.sort_order ?? '-'}
            </Typography>

          </CardContent>

        </Card>

        <PermissionRolesCard
          permissionId={permission.id}
        />

        <PermissionUsersCard
          permissionId={permission.id}
        />

        <Card>

          <CardContent>

            <Typography variant="h6">
              Audit Information
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Created At:</strong>{' '}
              {permission.created_at || '-'}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>
              <strong>Updated At:</strong>{' '}
              {permission.updated_at || '-'}
            </Typography>

          </CardContent>

        </Card>

      </div>

    </AppPage>
  );
}
