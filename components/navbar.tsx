"use client"

import Image from "next/image"
import Link from "next/link"

import Logo from "@/public/svg/logo.svg"
import { UserButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function NavigasiBar() {
    const { user } = useUser()

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
                    <div className="text-right">
                        <h3 className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</h3>
                        <p className="text-xs">{`${user?.emailAddresses}`}</p>
                    </div>
                    <UserButton />
                </div>
            </div>
        </>
    )
}