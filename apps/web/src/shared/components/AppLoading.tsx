import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export const AppLoading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
    <CircularProgress />
  </Box>
);