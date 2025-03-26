export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <title>Blog</title>
        <div>
          {children}
        </div>
      </section>
    );
  }