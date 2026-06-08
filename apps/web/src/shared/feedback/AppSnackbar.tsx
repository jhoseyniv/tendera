'use client';

import {
  Alert,
  Snackbar,
} from '@mui/material';

interface Props {

  open: boolean;

  message: string;

  severity?:
    | 'success'
    | 'error'
    | 'warning'
    | 'info';

  onClose: () => void;
}

export default function
AppSnackbar({

  open,

  message,

  severity = 'info',

  onClose,
}: Props) {

  return (

    <Snackbar

      open={open}

      autoHideDuration={4000}

      onClose={onClose}

      anchorOrigin={{

        vertical: 'top',

        horizontal: 'right',
      }}
    >

      <Alert

        severity={severity}

        onClose={onClose}

        variant="filled"

        sx={{

          width: '100%',
        }}
      >

        {message}

      </Alert>

    </Snackbar>

  );
}