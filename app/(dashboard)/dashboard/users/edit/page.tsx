"use client"

import role from "@/lib/role";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

import { useState } from "react";

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

    const [selectedRole, setSelectedRole] = useState(role[0]);

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
                                        <Listbox value={selectedRole} onChange={setSelectedRole}>
                                            <div className="relative mt-2">
                                                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                    <span className="col-start-1 row-start-1 truncate pr-6">{selectedRole?.ukuran}</span>
                                                    <ChevronUpDownIcon
                                                        aria-hidden="true"
                                                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                    />
                                                </ListboxButton>

                                                <ListboxOptions
                                                    transition
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                >
                                                    {role.map((role) => (
                                                        <ListboxOption
                                                            key={role.id}
                                                            value={role}
                                                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                        >
                                                            <span className="block truncate font-normal group-data-selected:font-semibold">{role.ukuran}</span>

                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#1A5098] group-not-data-selected:hidden group-data-focus:text-white">
                                                                <CheckIcon aria-hidden="true" className="size-5" />
                                                            </span>
                                                        </ListboxOption>
                                                    ))}
                                                </ListboxOptions>
                                            </div>
                                        </Listbox>
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