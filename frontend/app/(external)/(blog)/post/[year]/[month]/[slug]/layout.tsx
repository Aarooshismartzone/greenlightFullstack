export default function PostLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <div>
          {children}
        </div>
      </section>
    );
  }