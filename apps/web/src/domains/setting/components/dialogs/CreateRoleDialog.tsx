'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';

import {
  useState,
} from 'react';

interface Props {

  open: boolean;

  onClose: () => void;

  onSave: (
    data: {
      name: string;
      code: string;
      description: string;
    }
  ) => Promise<void>;
}

export default function CreateRoleDialog({

  open,

  onClose,

  onSave,

}: Props) {

  const [
    name,
    setName,
  ] = useState('');

  const [
    code,
    setCode,
  ] = useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  async function handleSave() {

    await onSave({

      name,

      code,

      description,
    });

    setName('');
    setCode('');
    setDescription('');

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
        Create Role
      </DialogTitle>

      <DialogContent>

        <Stack
          spacing={2}
          sx={{ mt: 1 }}
        >

          <TextField
            label="Name"
            value={name}
            onChange={e =>
              setName(
                e.target.value,
              )
            }
          />

          <TextField
            label="Code"
            value={code}
            onChange={e =>
              setCode(
                e.target.value,
              )
            }
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={e =>
              setDescription(
                e.target.value,
              )
            }
          />

        </Stack>

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