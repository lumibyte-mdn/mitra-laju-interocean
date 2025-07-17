// import Menu from "@/components/menu";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Sidebar />
            {/* <div className="w-1/5 bg-[#1A5098] pt-14">
                <div>
                    <Menu />
                </div>
                <div className="w-full fixed top-0 z-50">
                    <NavigasiBar />
                </div>
            </div>
            <div className="w-4/5 bg-slate-100 pt-16 overflow-auto">
                {children}
            </div> */}
            <main className="pb-10 lg:pl-72">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
}
