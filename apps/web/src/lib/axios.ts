import axios from 'axios';

const api = axios.create({

  baseURL:

    process.env.NEXT_PUBLIC_API_URL ||

    'http://localhost:3001',
});

api.interceptors.request.use(

  (config) => {

    if (

      typeof window !== 'undefined'

    ) {

      const token =
        localStorage.getItem(

          'access_token'
        );

      if (token) {

        config.headers.Authorization =

          `Bearer ${token}`;
      }

      const workspace =

        localStorage.getItem(

          'active_workspace'
        );

      if (workspace) {

        const parsed =
          JSON.parse(workspace);

        config.headers[
          'x-workspace-id'
        ] = parsed.id;
      }
    }

    return config;
  }
);

export default api;
