import React from 'react';
import { Typography, Box } from '@mui/material';

interface AppEmptyStateProps {
  message?: string;
}

export const AppEmptyState = ({ message = "No data available." }: AppEmptyStateProps) => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography variant="subtitle1">{message}</Typography>
  </Box>
);