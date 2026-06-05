'use client';

import { useEffect } from 'react';
import { getMyWorkspaces } from '../api/workspaces.api';
import { useWorkspaceStore } from '../store/workspace.store';

export function useWorkspaces() {

  const setWorkspaces =
    useWorkspaceStore(
      s => s.setWorkspaces
    );

  useEffect(() => {

    getMyWorkspaces()
      .then(setWorkspaces)
      .catch(console.error);

  }, [setWorkspaces]);
}