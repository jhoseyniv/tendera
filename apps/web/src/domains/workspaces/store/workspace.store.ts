import { create }
from 'zustand';

interface Workspace {

  id: string;

  name: string;

  code: string;
}

interface WorkspaceState {

  activeWorkspace:
    Workspace | null;

  workspaces:
    Workspace[];

  setActiveWorkspace: (

    workspace: Workspace

  ) => void;

  setWorkspaces: (

    workspaces: Workspace[]

  ) => void;

  restoreWorkspace: () => void;

  clearWorkspace: () => void;
}

export const useWorkspaceStore =

  create<WorkspaceState>((set) => ({

    activeWorkspace: null,

    workspaces: [],

    setActiveWorkspace: (

      workspace

    ) => {

      localStorage.setItem(

        'active_workspace',

        JSON.stringify(workspace)
      );

      set({

        activeWorkspace:
          workspace
      });
    },

    setWorkspaces: (

      workspaces

    ) => set({

      workspaces
    }),

    restoreWorkspace: () => {

      if (

        typeof window === 'undefined'

      ) {

        return;
      }

      const workspace =
        localStorage.getItem(

          'active_workspace'
        );

      if (workspace) {

        set({

          activeWorkspace:
            JSON.parse(workspace)
        });
      }
    },

    clearWorkspace: () => {

      localStorage.removeItem(

        'active_workspace'
      );

      set({

        activeWorkspace: null,

        workspaces: []
      });
    }
  }));

