export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <title>About Us</title>
      <div>
        {children}
      </div>
    </section>
  );
}
