import Link from "next/link";
import Image from "next/image";

import menuItems from "@/lib/menuItems";

export default function Menu() {
    const MENUITEMS = menuItems;

    return (
        <>
            <div className="mt-10 font-[family-name:var(--font-inter)] px-5">
                {MENUITEMS.map((i) => (
                    <div className="flex flex-col gap-2 mb-6" key={i.title}>
                        <span className="font-semibold text-xl text-white">{i.title}</span>
                        {i.items?.map((item) => (
                            <div key={item.label}>
                                <Link
                                    href={item.href}
                                    className="flex items-center p-2 rounded-lg transition duration-200 hover:bg-blue-900 hover:text-gray-300"
                                >
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        width={24}
                                        height={24}
                                        className="me-4"
                                    />
                                    <span className="text-white">{item.label}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}