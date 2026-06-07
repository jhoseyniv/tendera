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

  roleName?: string;

  onClose: () => void;

  onConfirm: () => Promise<void>;
}

export default function DeleteRoleDialog({

  open,

  roleName,

  onClose,

  onConfirm,

}: Props) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>
        Delete Role
      </DialogTitle>

      <DialogContent>

        Are you sure you want
        to delete:

        <b>
          {' '}
          {roleName}
        </b>

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