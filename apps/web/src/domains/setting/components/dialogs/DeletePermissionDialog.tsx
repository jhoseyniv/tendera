'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface Props {

  open: boolean;

  permissionName?: string;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

export default function
DeletePermissionDialog({

  open,

  permissionName,

  onClose,

  onConfirm,

}: Props) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>
        Delete Permission
      </DialogTitle>

      <DialogContent>

        <Typography>

          Are you sure you want to delete

          {' '}

          <strong>

            {permissionName}

          </strong>

          ?

        </Typography>

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