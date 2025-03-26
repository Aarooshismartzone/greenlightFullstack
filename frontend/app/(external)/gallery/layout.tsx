export default function GalleryLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <title>Gallery</title>
        <div>
          {children}
        </div>
      </section>
    );
  }