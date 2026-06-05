'use client';

import {

  useEffect

} from 'react';

import {

  useAuthStore

} from '@/domains/auth/store/auth.store';

export default function AuthProvider({

  children

}: {

  children: React.ReactNode

}) {

  const restoreAuth =
    useAuthStore(

      (s) => s.restoreAuth
    );

  useEffect(() => {

    restoreAuth();

  }, [

    restoreAuth
  ]);

  return <>{children}</>;
}