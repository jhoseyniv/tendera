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
UserAuditCard({

  user,
}: Props) {

  return (

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
          </strong>{' '}

          {user.created_at
            ? new Date(
                user.created_at,
              ).toLocaleString()
            : '-'}

        </Typography>

        <Typography>

          <strong>
            Updated At:
          </strong>{' '}

          {user.updated_at
            ? new Date(
                user.updated_at,
              ).toLocaleString()
            : '-'}

        </Typography>

      </CardContent>

    </Card>
  );
}