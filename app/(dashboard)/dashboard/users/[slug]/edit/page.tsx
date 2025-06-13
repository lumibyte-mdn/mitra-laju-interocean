"use client"

import roles from "@/lib/role";
import { transformDate } from "@/lib/utils";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

export default function EditForm() {
    const path = usePathname()
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(roles[0]);

    const [userForm, setUserForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        createdAt: ""
    })

    useEffect(() => {
        fetchUserDetail()
    }, [])
    
    /**
     * Handles the changes of the input form
     * made by the user
     * 
     * @param e 
     * @returns - none
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target

        setUserForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /**
     * This function enables the admin to edit
     * the information of the employees.
     * 
     * @returns - none
     */
    const handleClickEdit = () => setIsEditing(true);

    /**
     * This function cancels the user
     * to make an update to the form.
     * 
     * @returns - none
     */
    const handleClickCancel = (): void => {
        setIsEditing(false);
    };

    /**
     * Fetches user detail
     * 
     * @returns - none
     */
    const fetchUserDetail = async (): Promise<void> => {
        try {
            const res = await fetch(`/api/users/${path.split("/")[3]}`)

            if (!res.ok) {
                throw new Error("Failed to fetch data.")
            }

            const data = await res.json()

            if (data.success) {
                setUserForm(data.user)

                let index = 0
                
                for (let role of roles) {
                    if (role.value == data.user.role) {
                        setSelectedRole(roles[index])
                        break
                    }

                    index += 1
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Handles the submission of the user updates.
     * 
     * @param e 
     * @returns - none
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true)

        e.preventDefault()

        const formData: FormData = new FormData(e.currentTarget)

        formData.append("role", selectedRole.value)

        try {
            const res = await fetch(`/api/users/${path.split("/")[3]}`, {
                method: "PUT",
                body: formData
            })

            if (!res.ok) {
                throw new Error("Failed to submit data.")
            }

            const data = await res.json()

            if (data.success) {
                router.push("/dashboard/users")
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="mx-8 my-8">
                <form onSubmit={handleSubmit} className={`bg-white ${isEditing ? "pt-8" : "py-8"} ${isEditing ? "rounded-lg" : "rounded-b-none"}`}>
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">Edit Data Pengguna</h1>
                                <p className="mt-1 text-sm text-gray-700">Anda dapat mengupdate data pengguna Anda disini.</p>
                            </div>

                            <div className="mt-8">
                                <div className="flex mt-8 justify-between gap-6">
                                    <div className="w-1/2">
                                        <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                            Nama Depan
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="firstName"
                                                type="text"
                                                disabled={!isEditing}
                                                placeholder="Nama Depan"
                                                onChange={handleChange}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                                value={userForm.firstName}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-1/2">
                                        <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                                            Nama Belakang
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="lastName"
                                                type="text"
                                                disabled={!isEditing}
                                                onChange={handleChange}
                                                placeholder="Nama Belakang"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                                value={userForm.lastName}
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
                                            name="email"
                                            type="email"
                                            disabled={!isEditing}
                                            onChange={handleChange}
                                            placeholder="kamu@contoh.com"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                            value={userForm.email}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="role" className="block text-sm/6 font-medium text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <Listbox disabled={!isEditing} value={selectedRole} onChange={setSelectedRole}>
                                            <div className="relative mt-2">
                                                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                    <span className="col-start-1 row-start-1 truncate pr-6">{selectedRole.role}</span>
                                                    <ChevronUpDownIcon
                                                        aria-hidden="true"
                                                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                    />
                                                </ListboxButton>

                                                <ListboxOptions
                                                    transition
                                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                >
                                                    {
                                                        roles.map((role) => (
                                                            <ListboxOption
                                                                key={role.id}
                                                                value={role}
                                                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                            >
                                                                <span className="block truncate font-normal group-data-selected:font-semibold">{role.role}</span>

                                                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#1A5098] group-not-data-selected:hidden group-data-focus:text-white">
                                                                    <CheckIcon aria-hidden="true" className="size-5" />
                                                                </span>
                                                            </ListboxOption>
                                                        ))
                                                    }
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
                                            name="createdAt"
                                            type="text"
                                            placeholder="12/3/2025"
                                            disabled
                                            readOnly
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400"
                                            value={transformDate(userForm.createdAt.split("T")[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {isEditing ? (
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8 rounded-b-lg">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                                >
                                    Simpan
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClickCancel}
                                    data-autofocus
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Batal
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </form>
                
                <div>
                    {
                        isEditing ?
                        <></>
                        :
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
                            <button
                                onClick={handleClickEdit}
                                className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                            >
                                Edit data pengguna
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}