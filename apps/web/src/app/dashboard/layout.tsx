import Sidebar from '@/layout/sidebar/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: '24px',
        }}
      >
        {children}
      </main>
    </div>
  )
}