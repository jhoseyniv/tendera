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

import { useState } from 'react';
import AppSnackbar from '@/shared/feedback/AppSnackbar';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (
    data: {
      page_code: string;
      page_name: string;
      route_path: string;
      description: string;
    }
  ) => Promise<void>;
}

export default function CreatePermissionDialog({ open, onClose, onSave }: Props) {
  const [pageCode, setPageCode] = useState('');
  const [pageName, setPageName] = useState('');
  const [routePath, setRoutePath] = useState('');
  const [description, setDescription] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  async function handleSave() {
    try {
      await onSave({
        page_code: pageCode,
        page_name: pageName,
        route_path: routePath,
        description,
      });

      setSnackbarMessage('Permission created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setPageCode('');
      setPageName('');
      setRoutePath('');
      setDescription('');

      onClose();
    } catch (error: any) {
      setSnackbarMessage(error?.response?.data?.message ?? 'Failed to create permission');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Permission</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Page Code"
              value={pageCode}
              onChange={e => setPageCode(e.target.value)}
            />
            <TextField
              label="Page Name"
              value={pageName}
              onChange={e => setPageName(e.target.value)}
            />
            <TextField
              label="Route Path"
              value={routePath}
              onChange={e => setRoutePath(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}