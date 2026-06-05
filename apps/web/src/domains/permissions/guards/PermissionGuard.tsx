'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/domains/auth/store/auth.store';

interface Props {
  permission: string;
  children: React.ReactNode;
}

export default function PermissionGuard({ permission, children }: Props) {
  const router = useRouter();
  const pages = useAuthStore((s) => s.pages);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        router.push('/not-authorized');
        return;
      }

      // اگر pages خالی است هنوز fetch نشده
      if (pages.length === 0) {
        setLoading(true);
        return;
      }

      const hasPermission = pages.some((p) => p.page_code === permission);
      if (!hasPermission) {
        router.push('/not-authorized');
        return;
      }

      setAllowed(true);
      setLoading(false);

      console.log('pages from cache/API:', pages);
      console.log('required permission:', permission);
    };

    checkPermission();
  }, [pages, permission, router]);

  if (loading) return null; // یا می‌توان spinner گذاشت
  if (!allowed) return null; // هنوز redirect نشده
  return <>{children}</>;
}