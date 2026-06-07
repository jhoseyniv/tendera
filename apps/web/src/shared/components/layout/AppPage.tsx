import React from 'react';

import {
  Box,
  Typography,
  Divider,
} from '@mui/material';

interface AppPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AppPage({
  title,
  subtitle,
  children,
}: AppPageProps) {

  return (

    <Box
      component="div"
      sx={{
        p: 4,
      }}
    >

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      {subtitle && (

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 2,
          }}
        >
          {subtitle}
        </Typography>

      )}

      <Divider
        sx={{
          mb: 3,
        }}
      />

      {children}

    </Box>

  );
}