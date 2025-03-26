export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
          <title>Log In</title>
        <div>
          {children}
        </div>
      </section>
    );
  }