'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function WorkspacesPage() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Workspaces
      </Typography>

      <Typography variant="body1">
        اینجا لیست Workspaces و جزئیات مرتبط نمایش داده می‌شود.
        شما می‌توانید کارت‌ها، جداول یا سایر کامپوننت‌های مربوط به Workspaces را در اینجا اضافه کنید.
      </Typography>
    </Box>
  );
}