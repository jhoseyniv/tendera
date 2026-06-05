import { create }
from 'zustand';

interface PageItem {

  id: string;

  page_code: string;

  page_name: string;

  route_path: string;

  parent_id?: string | null;

  icon?: string | null;

  sort_order?: number;
}

interface AuthState {

  token: string | null;

  user: any | null;

  pages: PageItem[];

  pagesLoaded: boolean;

  setAuth: (

    token: string,

    user: any

  ) => void;

  setPages: (

    pages: PageItem[]

  ) => void;

  logout: () => void;

  restoreAuth: () => void;
}

export const useAuthStore =

  create<AuthState>((set) => ({

    token: null,

    user: null,

    pages: [],

    pagesLoaded: false,

    setAuth: (

      token,

      user

    ) => {

      localStorage.setItem(

        'access_token',

        token
      );

      localStorage.setItem(

        'user',

        JSON.stringify(user)
      );

      set({

        token,

        user
      });
    },

    setPages: (

      pages

    ) => set({

      pages,

      pagesLoaded: true
    }),

    logout: () => {

      localStorage.removeItem(
        'access_token'
      );

      localStorage.removeItem(
        'user'
      );

      set({

        token: null,

        user: null,

        pages: [],

        pagesLoaded: false
      });
    },

    restoreAuth: () => {

      const token =
        localStorage.getItem(
          'access_token'
        );

      const user =
        localStorage.getItem(
          'user'
        );

      if (

        token &&
        user

      ) {

        set({

          token,

          user:
            JSON.parse(user)
        });
      }
    }
  }));