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
  useEffect,
  useState,
} from 'react';

interface Props {

  open: boolean;

  role?: {
    id: string;
    name: string;
    code: string;
    description?: string;
  };

  onClose: () => void;

  onSave: (
    id: string,
    data: {
      name: string;
      code: string;
      description: string;
    },
  ) => Promise<void>;
}

export default function EditRoleDialog({

  open,

  role,

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

  useEffect(() => {

    if (!role) {
      return;
    }

    setName(role.name);

    setCode(role.code);

    setDescription(
      role.description || '',
    );

  }, [role]);

  async function handleSave() {

    if (!role) {
      return;
    }

    await onSave(

      role.id,

      {
        name,
        code,
        description,
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
        Edit Role
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