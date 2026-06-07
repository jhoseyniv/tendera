'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  useAuthStore,
} from '@/domains/auth/store/auth.store';

interface Props {

  permission: string;

  children: React.ReactNode;
}

export default function PermissionGuard({

  permission,

  children,

}: Props) {

  const router =
    useRouter();

  const pages =
    useAuthStore(
      (s) => s.pages,
    );

  const [allowed, setAllowed] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const checkPermission =
      async () => {

        const token =
          localStorage.getItem(
            'access_token',
          );

        // Not Authenticated
        if (!token) {

          setAllowed(false);

          setLoading(false);

          router.push(
            '/login',
          );

          return;
        }

        // Pages هنوز لود نشده
        if (pages.length === 0) {

          setLoading(true);

          return;
        }

        const hasPermission =
          pages.some(
            (p) =>
              p.page_code ===
              permission,
          );

        // Authenticated ولی Unauthorized
        if (!hasPermission) {

          setAllowed(false);

          setLoading(false);

          router.push(
            '/not-authorized',
          );

          return;
        }

        setAllowed(true);

        setLoading(false);
      };

    checkPermission();

  }, [

    pages,

    permission,

    router,

  ]);

  if (loading) {

    return null;
  }

  if (!allowed) {

    return null;
  }

  return <>{children}</>;
}