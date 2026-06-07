'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';

import {
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  useAuthStore,
} from '@/domains/auth/store/auth.store';

export default function AppTopbar() {

  const router =
    useRouter();

  const logout =
    useAuthStore(
      (s) => s.logout,
    );

  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(
      null,
    );

  const user =
    typeof window !== 'undefined'
      ? JSON.parse(
          localStorage.getItem(
            'user',
          ) || '{}',
        )
      : {};

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {

    setAnchorEl(
      event.currentTarget,
    );
  };

  const handleCloseMenu = () => {

    setAnchorEl(
      null,
    );
  };

  const handleProfile = () => {

    handleCloseMenu();

    router.push(
      '/settings/profile',
    );
  };

  const handleLogout = () => {

    handleCloseMenu();

    logout();

    router.push(
      '/login',
    );
  };

  return (

    <AppBar
      position="static"
      color="inherit"
      elevation={1}
    >

      <Toolbar>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          Tendera
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
          }}
        />

        <IconButton
          onClick={
            handleOpenMenu
          }
        >

          <Avatar>

            {user?.email?.[0]
              ?.toUpperCase() || 'U'}

          </Avatar>

        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={
            handleCloseMenu
          }
        >

          <MenuItem disabled>

            {user?.email ||
              'User'}

          </MenuItem>

          <Divider />

          <MenuItem
            onClick={
              handleProfile
            }
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={
              handleLogout
            }
          >
            Logout
          </MenuItem>

        </Menu>

      </Toolbar>

    </AppBar>

  );
}