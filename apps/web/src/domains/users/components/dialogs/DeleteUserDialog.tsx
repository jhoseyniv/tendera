'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface Props {

  open: boolean;

  userName?: string;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

export default function
DeleteUserDialog({

  open,

  userName,

  onClose,

  onConfirm,
}: Props) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>

        Delete User

      </DialogTitle>

      <DialogContent>

        Delete

        {' '}

        <strong>

          {userName}

        </strong>

        ?

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}