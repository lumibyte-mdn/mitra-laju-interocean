import Image from "next/image"
import Link from "next/link"

import avatar from "@/public/svg/Avatar.svg"
import Logo from "@/public/svg/logo.svg"

export default function NavigasiBar() {
    return (
        <>
            <div className="bg-white flex justify-between items-center px-4">
                <div className="flex items-center gap-12">
                    <Link
                        href={""}
                        className="flex space-x-4 items-center py-5 px-3"
                    >
                        <Image
                            src={Logo}
                            alt=""
                            className="w-10"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold text-[#1A5098] text-base font-[family-name:var(--font-inter)]">PT. Mitra Laju Interocean</span>
                        </div>
                    </Link>

                    <div className="relative w-96">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari sesuatu..."
                            className="w-full p-2 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 font-[family-name:var(--font-inter)] text-base"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col text-end">
                        <p className="font-[family-name:var(--font-inter)] font-semibold">Suherman</p>
                        <p className="font-[family-name:var(--font-inter)] text-xs">Admin</p>
                    </div>
                    <Link
                        href={""}
                    >
                        <Image
                            src={avatar}
                            alt=""
                            width={44}
                            height={44}
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}