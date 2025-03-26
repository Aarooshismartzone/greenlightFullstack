export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
          <title>Dashboard</title>
        <div>
          {children}
        </div>
      </section>
    );
  }