import Sidebar
from '@/layout/sidebar/Sidebar';

import AppTopbar
from '@/layout/topbar/AppTopbar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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

        <main
          style={{
            flex: 1,
            padding: '24px',
          }}
        >

          {children}

        </main>

      </div>

    </div>

  );
}