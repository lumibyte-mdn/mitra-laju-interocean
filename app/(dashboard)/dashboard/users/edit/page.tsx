"use client"

import { ChevronDownIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

import Link from "next/link";
import { use, useState } from "react";

export default function editForm() {
    const [isEditing, setIsEditing] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => {
        setIsEditing(false);
        setShowPassword(false);
    };

    const handleSaveClick = () => {
        // Simulasikan penyimpanan data, bisa ganti dengan fetch/axios post di sini
        alert("Data berhasil disimpan!");
        setIsEditing(false);
        setShowPassword(false);
    };

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white pt-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Edit Data Pengguna</h1>
                                <p className="mt-1 text-sm text-gray-700">Anda dapat mengupdate data pengguna Anda disini.</p>
                            </div>

                            <div className="mt-8">
                                <div className="flex mt-8 justify-between gap-6">
                                    <div className="w-1/2">
                                        <label htmlFor="namadepan" className="block text-sm/6 font-medium text-gray-900">
                                            Nama Depan
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="namadepan"
                                                name="namadepan"
                                                type="text"
                                                disabled={!isEditing}
                                                placeholder="Nama Depan"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label htmlFor="namabelakang" className="block text-sm/6 font-medium text-gray-900">
                                            Nama Belakang
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="namabelakang"
                                                name="namabelakang"
                                                type="text"
                                                disabled={!isEditing}
                                                placeholder="Nama Belakang"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            disabled={!isEditing}
                                            placeholder="kamu@contoh.com"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            disabled={!isEditing}
                                            placeholder="Masukkan Kata Sandi"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => isEditing && setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <div>
                                            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                                <select
                                                    id="role"
                                                    name="role"
                                                    aria-label="role"
                                                    disabled={!isEditing}
                                                    className="block w-full rounded-md col-start-1 row-start-1 outline-1 appearance-none py-1.5 pr-7 pl-3 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098]
                                                                                sm:text-sm/6 disabled:text-gray-400"
                                                >
                                                    <option>Admin</option>
                                                    <option>Karyawan</option>
                                                    <option>HRD</option>
                                                </select>
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="dibuat" className="block text-sm/6 font-medium text-gray-900">
                                        Dibuat
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="dibuat"
                                            name="dibuat"
                                            type="text"
                                            placeholder="12/3/2025"
                                            disabled
                                            readOnly
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8 rounded-b-lg">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={handleSaveClick}
                                    className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                                >
                                    Simpan
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancelClick}
                                    data-autofocus
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Batal
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                            >
                                Edit data pengguna
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}