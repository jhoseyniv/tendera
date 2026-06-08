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

interface Permission {

  id: string;

  page_code: string;

  page_name: string;

  route_path: string;

  description?: string;
}

interface Props {

  open: boolean;

  permission?: Permission;

  onClose: () => void;

  onSave: (
    id: string,
    data: any,
  ) => Promise<void>;
}

export default function
EditPermissionDialog({

  open,

  permission,

  onClose,

  onSave,

}: Props) {

  const [
    pageCode,
    setPageCode,
  ] = useState('');

  const [
    pageName,
    setPageName,
  ] = useState('');

  const [
    routePath,
    setRoutePath,
  ] = useState('');

  const [
    description,
    setDescription,
  ] = useState('');

  useEffect(() => {

    if (!permission) {

      return;
    }

    setPageCode(
      permission.page_code,
    );

    setPageName(
      permission.page_name,
    );

    setRoutePath(
      permission.route_path,
    );

    setDescription(
      permission.description ||
      '',
    );

  }, [permission]);

  async function handleSave() {

    if (!permission) {

      return;
    }

    await onSave(

      permission.id,

      {

        page_code:
          pageCode,

        page_name:
          pageName,

        route_path:
          routePath,

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
        Edit Permission
      </DialogTitle>

      <DialogContent>

        <Stack
          spacing={2}
          sx={{
            mt: 1,
          }}
        >

          <TextField
            label="Page Code"
            value={pageCode}
            onChange={e =>
              setPageCode(
                e.target.value,
              )
            }
          />

          <TextField
            label="Page Name"
            value={pageName}
            onChange={e =>
              setPageName(
                e.target.value,
              )
            }
          />

          <TextField
            label="Route Path"
            value={routePath}
            onChange={e =>
              setRoutePath(
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