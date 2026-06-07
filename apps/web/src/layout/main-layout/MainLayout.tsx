'use client';

import {
  useEffect,
  useState
} from 'react';

import {
  useRouter
} from 'next/navigation';

import Sidebar
from '@/layout/sidebar/Sidebar';
import AppTopbar
from '@/layout/topbar/AppTopbar';
export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {

  const router =
    useRouter();

  const [authorized,
    setAuthorized] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem(
        'access_token'
      );

    if (!token) {

      router.push('/login');

    } else {

      setAuthorized(true);
    }

  }, []);

  if (!authorized) {

    return null;
  }

  return (

  <div
    style={{
      display: 'flex',
    }}
  >

    <Sidebar />

    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >

      <AppTopbar />

      <div
        style={{
          flex: 1,
          padding: '20px',
        }}
      >

        {children}

      </div>

    </div>

  </div>
);
}