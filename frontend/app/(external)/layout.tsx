import { Navbar } from "@/components/navbar";

export default function ExternalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Navbar />
            <div>
                {children}
            </div>
        </section>
    );
}