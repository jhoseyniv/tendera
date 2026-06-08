import React, {
  ReactNode,
} from 'react';

import {
  Box,
} from '@mui/material';

interface AppToolbarProps {

  children?: ReactNode;
}

export default function AppToolbar({

  children,

}: AppToolbarProps) {

  return (

    <Box
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent:
          'space-between',
        alignItems:
          'center',
      }}
    >

      {children}

    </Box>

  );
}