'use client';

import MainLayout
from '@/layout/main-layout/MainLayout';

export default function DashboardPage() {

  const user =
    JSON.parse(
      localStorage.getItem('user')
      || '{}'
    );

  return (

    <MainLayout>

      <h1>
        Dashboard
      </h1>

      <p>
        Welcome {user.email}
      </p>

    </MainLayout>
  );
}