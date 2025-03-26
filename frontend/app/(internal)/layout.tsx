import Sidebar from "@/components/internal/layout/sidebar";
import Topbar from "@/components/internal/layout/topbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"],
});

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className={`grid grid-cols-5 ${poppins.className}`}>
            <div className="col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-4">
                <Topbar />
                {children}
            </div>
        </div>
    );
  }