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