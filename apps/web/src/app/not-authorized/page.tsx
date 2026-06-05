'use client';

import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotAuthorizedPage() {
  const router = useRouter();

  // Optional: بعد از چند ثانیه redirect به dashboard
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h3" color="error" gutterBottom>
        403 - Access Denied
      </Typography>
      <Typography variant="body1">
        شما اجازه دسترسی به این صفحه را ندارید.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        شما به طور خودکار به داشبورد هدایت خواهید شد.
      </Typography>
    </Box>
  );
}