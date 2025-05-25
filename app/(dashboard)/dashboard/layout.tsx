import Menu from "@/components/menu";
import NavigasiBar from "@/components/navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex">
            <div className="w-1/5 bg-[#1A5098] pt-14">
                <div>
                    <Menu />
                </div>
                <div className="w-full fixed top-0 z-50">
                    <NavigasiBar />
                </div>
            </div>
            <div className="w-4/5 bg-slate-100 pt-16 overflow-auto">
                {children}
            </div>
        </div>
    );
}
