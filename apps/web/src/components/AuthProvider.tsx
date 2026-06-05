'use client';

import {

  useEffect

} from 'react';

import {

  useAuthStore

} from '@/domains/auth/store/auth.store';

import {

  useWorkspaceStore

} from '@/domains/workspaces/store/workspace.store';

export default function AuthProvider({

  children

}: {

  children: React.ReactNode;

}) {

  const restoreAuth =
    useAuthStore(

      (s) => s.restoreAuth
    );

  const restoreWorkspace =
    useWorkspaceStore(

      (s) => s.restoreWorkspace
    );

  useEffect(() => {

    restoreAuth();

    restoreWorkspace();

  }, [

    restoreAuth,

    restoreWorkspace
  ]);

  return <>{children}</>;
}
