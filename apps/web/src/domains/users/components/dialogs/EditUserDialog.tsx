'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

interface Props {

  open: boolean;

  user?: any;

  onClose: () => void;

  onSave: (
    id: string,
    data: any,
  ) => Promise<void>;
}

export default function
EditUserDialog({

  open,

  user,

  onClose,

  onSave,
}: Props) {

  const [
    firstName,
    setFirstName,
  ] = useState('');

  const [
    lastName,
    setLastName,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  useEffect(() => {

    if (!user) {
      return;
    }

    setFirstName(
      user.firstName ?? '',
    );

    setLastName(
      user.lastName ?? '',
    );

    setEmail(
      user.email ?? '',
    );

  }, [user]);

  async function
  handleSave() {

    if (!user) {
      return;
    }

    await onSave(

      user.id,

      {
        firstName,
        lastName,
        email,
      },
    );

    onClose();
  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>

        Edit User

      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          value={firstName}
          onChange={e =>
            setFirstName(
              e.target.value,
            )
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          value={lastName}
          onChange={e =>
            setLastName(
              e.target.value,
            )
          }
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={e =>
            setEmail(
              e.target.value,
            )
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}