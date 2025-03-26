export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <title>Check Contact Details</title>
        <div>
          {children}
        </div>
      </section>
    );
  }