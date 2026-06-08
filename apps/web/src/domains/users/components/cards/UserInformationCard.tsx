'use client';

import {
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

interface Props {

  user: any;
}

export default function
UserInfoCard({

  user,
}: Props) {

  return (

    <Card
      sx={{
        mb: 2,
      }}
    >

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
            Email:
          </strong>{' '}

          {user.email}

        </Typography>

        <Typography>

          <strong>
            Name:
          </strong>{' '}

          {user.name ?? '-'}

        </Typography>

        <Typography>

          <strong>
            Status:
          </strong>{' '}

          {user.is_active
            ? 'Active'
            : 'Inactive'}

        </Typography>

        <Typography>

          <strong>
            User ID:
          </strong>{' '}

          {user.id}

        </Typography>

        <Typography>

          <strong>
            Created At:
          </strong>{' '}

          {user.created_at
            ? new Date(
                user.created_at,
              ).toLocaleString()
            : '-'}

        </Typography>

      </CardContent>

    </Card>

  );
}