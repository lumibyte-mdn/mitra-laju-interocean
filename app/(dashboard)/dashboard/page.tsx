"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    return (
        <>
            <div className="mx-8 mt-4">
                <div className="flex items-center mb-4 justify-between">
                    <div className="">
                        <h1 className="font-bold text-2xl font-[family-name:var(--font-inter)] text-gray-800">Dashboard</h1>
                    </div>
                    
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-300 h-44 rounded-lg flex items-center justify-center">
                        placeholder
                    </div>
                    <div className="bg-gray-300 h-44 rounded-lg flex items-center justify-center">
                        placeholder
                    </div>
                    <div className="bg-gray-300 h-44 rounded-lg flex items-center justify-center">
                        placeholder
                    </div>
                    <div className="col-span-2 bg-gray-300 h-96 rounded-lg flex items-center justify-center">
                        placeholder
                    </div>
                    <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
                        placeholder
                    </div>
                </div>
            </div>
        </>
    )
}