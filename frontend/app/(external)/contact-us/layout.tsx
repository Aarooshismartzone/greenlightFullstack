export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <title>Contact Us</title>
      <div>
        {children}
      </div>
    </section>
  );
}
