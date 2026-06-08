'use client';

import {
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

import AppSnackbar
from '@/shared/feedback/AppSnackbar';

interface Props {

  open: boolean;

  onClose: () => void;

  onSave: (
    data: any,
  ) => Promise<void>;
}

export default function
CreateUserDialog({

  open,

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

  const [
    snackbarOpen,
    setSnackbarOpen,
  ] = useState(false);

  const [
    snackbarMessage,
    setSnackbarMessage,
  ] = useState('');

  const [
    snackbarSeverity,
    setSnackbarSeverity,
  ] = useState<
    'success'
    | 'error'
    | 'warning'
    | 'info'
  >('info');

  async function handleSave() {

    try {

      await onSave({

        firstName,

        lastName,

        email,
      });

      setSnackbarMessage(
        'User created successfully',
      );

      setSnackbarSeverity(
        'success',
      );

      setSnackbarOpen(
        true,
      );

      setFirstName('');
      setLastName('');
      setEmail('');

      onClose();

    } catch (error: any) {

      setSnackbarMessage(

        error?.response?.data?.message ??

        'Failed to create user',
      );

      setSnackbarSeverity(
        'error',
      );

      setSnackbarOpen(
        true,
      );
    }
  }

  return (

    <>

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>

          Create User

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

      <AppSnackbar

        open={
          snackbarOpen
        }

        message={
          snackbarMessage
        }

        severity={
          snackbarSeverity
        }

        onClose={() =>
          setSnackbarOpen(
            false,
          )
        }

      />

    </>

  );
}