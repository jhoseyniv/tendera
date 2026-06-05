'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/domains/auth/store/auth.store';
import { Button, TextField, Typography, Box, Container, Alert } from '@mui/material';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      // Login API
      const res = await axios.post('http://localhost:3001/auth/login', {
        email,
        password
      });

      // پاک کردن داده‌های قبلی
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');

      // ذخیره JWT و User جدید
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // آپدیت Zustand / Store
      setAuth(res.data.access_token, res.data.user);

      // Redirect
      router.push('/dashboard');

    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Unable to connect to server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: 4 }}>
        <Box sx={{ width: '100%', p: 4, boxShadow: 3, borderRadius: 3, backgroundColor: '#fff' }}>
          <Typography variant="h4" gutterBottom textAlign="center" fontWeight={700}>
            Tendera AI
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
            Sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, height: 48 }}
            >
              {loading ? 'Signing In...' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}