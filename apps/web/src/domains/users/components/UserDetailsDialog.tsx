'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import UserInfoCard
from './cards/UserInformationCard';

import UserRolesCard
from './cards/UserRolesCard';

import UserWorkspacesCard
from './cards/UserWorkspacesCard';

interface Props {

  open: boolean;

  onClose: () => void;

  user: any | null;
}

export default function
UserDetailsDialog({

  open,

  onClose,

  user,
}: Props) {

  if (!user) {

    return null;
  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        User Details

      </DialogTitle>

      <DialogContent>

        <UserInfoCard
          user={user}
        />

        <div
          style={{
            marginTop: 16,
          }}
        >

          <UserRolesCard
            userId={user.id}
          />

        </div>

        <div
          style={{
            marginTop: 16,
          }}
        >

          <UserWorkspacesCard
            userId={user.id}
          />

        </div>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >

          Close

        </Button>

      </DialogActions>

    </Dialog>

  );
}