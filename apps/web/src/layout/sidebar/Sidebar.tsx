'use client';

import {

  useEffect

} from 'react';

import Link from 'next/link';

import axios from '@/lib/axios';

import {

  useAuthStore

} from '@/domains/auth/store/auth.store';

import {

  useWorkspaceStore

} from '@/domains/workspaces/store/workspace.store';

import {

  getMyWorkspaces

} from '@/domains/workspaces/api/workspaces.api';

export default function Sidebar() {

  const pages =
    useAuthStore(
      (s) => s.pages
    );

  const pagesLoaded =
    useAuthStore(
      (s) => s.pagesLoaded
    );

  const setPages =
    useAuthStore(
      (s) => s.setPages
    );

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  const workspaces =
    useWorkspaceStore(
      (s) => s.workspaces
    );

  const activeWorkspace =
    useWorkspaceStore(
      (s) => s.activeWorkspace
    );

  const setWorkspaces =
    useWorkspaceStore(
      (s) => s.setWorkspaces
    );

  const setActiveWorkspace =
    useWorkspaceStore(
      (s) => s.setActiveWorkspace
    );

  useEffect(() => {

    if (pagesLoaded) return;

    const loadPages = async () => {

      try {

        const response =
          await axios.get(

            '/me/pages'
          );

        setPages(
          response.data || []
        );

      } catch (err) {

        console.error(err);

        setPages([]);
      }
    };

    loadPages();

  }, [

    pagesLoaded,

    setPages
  ]);

  useEffect(() => {

    const loadWorkspaces = async () => {

      try {

        const data =
          await getMyWorkspaces();

        setWorkspaces(data);

        if (

          data.length > 0 &&

          !activeWorkspace

        ) {

          setActiveWorkspace(
            data[0]
          );
        }

      } catch (err) {

        console.error(err);
      }
    };

    loadWorkspaces();

  }, [

    setWorkspaces,

    setActiveWorkspace,

    activeWorkspace
  ]);

  
  const renderChildren = (

    parentId: string

  ) => {

    return pages

      .filter(

        (p) =>
          p.parent_id ===
          parentId
      )

      .map((child) => (

        <li
          key={child.page_code}
          style={{
            marginLeft: '16px',
            marginBottom: '8px'
          }}
        >

          <Link

            href={child.route_path}

            style={{

              color: 'white',

              textDecoration:
                'none'
            }}
          >

            {child.page_name}

          </Link>

          {renderChildren(
            child.id
          )}

        </li>
      ));
  };

  return (

    <div

      style={{

        width: '250px',

        height: '100vh',

        background: '#111827',

        color: 'white',

        padding: '20px',
      }}
    >

      <h2>

        Tendera AI

      </h2>

      <div
        style={{
          marginBottom: '20px'
        }}
      >

        <select

          value={
            activeWorkspace?.id || ''
          }

          onChange={(e) => {

            const workspace =

              workspaces.find(

                (w) =>
                  w.id ===
                  e.target.value
              );

            if (workspace) {

              setActiveWorkspace(
                workspace
              );
            }
          }}

          style={{

            width: '100%',

            padding: '10px',

            borderRadius: '8px'
          }}
        >

          {workspaces.map(

            (workspace) => (

              <option

                key={workspace.id}

                value={workspace.id}
              >

                {workspace.name}

              </option>
            )
          )}
        </select>

      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0
        }}
      >

        {pages

          .filter(
            (p) => !p.parent_id
          )

          .map((parent) => (

            <li

              key={parent.page_code}

              style={{
                marginBottom: '12px'
              }}
            >

              <Link

                href={
                  parent.route_path
                }

                style={{

                  color: 'white',

                  textDecoration:
                    'none'
                }}
              >

                {parent.page_name}

              </Link>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0
                }}
              >

                {renderChildren(
                  parent.id
                )}

              </ul>

            </li>
          ))}
      </ul>

     

    </div>
  );
}

