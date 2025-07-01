"use client"

import shipmentTypes from "@/lib/shipmentTypes";
import sizes from "@/lib/sizes";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

import React, { FormEvent, useState } from "react";

export default function ShipmentAdd() {
    const router = useRouter()

    // Used for dropdown selection
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [selectedShipmentType, setSelectedShipmentType] = useState(shipmentTypes[0]);

    /**
     * This function handles the submission of the shipment
     * data ONLY. Before proceeding to the costing section.
     *
     * @param e
     */
    const handleSubmitShipment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        formData.set("size", selectedSize.value)
        formData.set("shipmentType", selectedShipmentType.value)

        try {
            const res = await fetch("/api/shipments", {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to submit data.")
            }

            if (data.success) {
                router.push("/dashboard/shipments")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white py-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">Tambah Data Shipment</h1>
                                    <p className="mt-1 text-sm text-gray-700 w-1/2">Tambah formulir pengelolaan pengiriman lengkap.</p>
                                </div>
                            </div>

                            <div className="overflow-y-auto max-h-[66vh] mt-8">
                                {/* Shipment Form */}
                                <form onSubmit={handleSubmitShipment}>
                                    {/* Shipment Data */}
                                    <div>
                                        <div>
                                            <div className="mb-4">
                                                <h1 className="text-lg font-semibold text-[#1A5098]">Data Shipment</h1>
                                            </div>
                                            <div className="flex items-center w-1/2 justify-between">
                                                <div className="w-1/3">
                                                    <label htmlFor="orderNumber" className="block text-sm/6 font-medium text-gray-900">
                                                        Nomor Orderan :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        id="orderNumber"
                                                        name="orderNumber"
                                                        type="text"
                                                        placeholder="Masukkan nomor orderan"
                                                        className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="customer" className="block text-sm/6 font-medium text-gray-900">
                                                        Customer :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        id="customer"
                                                        name="customer"
                                                        type="text"
                                                        placeholder="Masukkan nama customer"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="shipper" className="block text-sm/6 font-medium text-gray-900">
                                                        Shipper :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="shipper"
                                                        name="shipper"
                                                        type="text"
                                                        placeholder="Masukkan nama shipper"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="dueDate" className="block text-sm/6 font-medium text-gray-900">
                                                        Due Date :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="dueDate"
                                                        name="dueDate"
                                                        type="date"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Operational */}
                                    <div>
                                        <div className="mt-8">
                                            <div className="mb-4">
                                                <h1 className="text-lg font-semibold text-[#1A5098]">Operational</h1>
                                            </div>
                                            <div className="flex items-center w-1/2 justify-between">
                                                <div className="w-1/3">
                                                    <label htmlFor="customerCode" className="block text-sm/6 font-medium text-gray-900">
                                                        Kode Customer :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        id="customerCode"
                                                        name="customerCode"
                                                        type="text"
                                                        placeholder="Masukkan nomor orderan"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="qty" className="block text-sm/6 font-medium text-gray-900">
                                                        Quantity :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input
                                                        id="qty"
                                                        name="qty"
                                                        type="number"
                                                        placeholder="Masukkan nama customer"
                                                        className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="size" className="block text-sm/6 font-medium text-gray-900">
                                                        Ukuran :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <Listbox value={selectedSize} onChange={setSelectedSize}>
                                                        <div className="relative">
                                                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                                <span className="col-start-1 row-start-1 truncate pr-6">{selectedSize?.value}</span>
                                                                <ChevronUpDownIcon
                                                                    aria-hidden="true"
                                                                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                                />
                                                            </ListboxButton>

                                                            <ListboxOptions
                                                                transition
                                                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                            >
                                                                {sizes.map((size) => (
                                                                    <ListboxOption
                                                                        key={size.id}
                                                                        value={size}
                                                                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                                    >
                                                                        <span className="block truncate font-normal group-data-selected:font-semibold">{size.value}</span>

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

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="origin" className="block text-sm/6 font-medium text-gray-900">
                                                        Asal :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="origin"
                                                        name="origin"
                                                        type="text"
                                                        placeholder="Masukkan asal Kota / Negara"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="destination" className="block text-sm/6 font-medium text-gray-900">
                                                        Tujuan :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="destination"
                                                        name="destination"
                                                        type="text"
                                                        placeholder="Masukkan asal Kota / Negara"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="shipmentType" className="block text-sm/6 font-medium text-gray-900">
                                                        Tipe Shipment :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <Listbox value={selectedShipmentType} onChange={setSelectedShipmentType}>
                                                        <div className="relative">
                                                            <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                                <span className="col-start-1 row-start-1 truncate pr-6">{selectedShipmentType?.name}</span>
                                                                <ChevronUpDownIcon
                                                                    aria-hidden="true"
                                                                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                                />
                                                            </ListboxButton>

                                                            <ListboxOptions
                                                                transition
                                                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                            >
                                                                {shipmentTypes.map((shipmentType) => (
                                                                    <ListboxOption
                                                                        key={shipmentType.id}
                                                                        value={shipmentType}
                                                                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                                    >
                                                                        <span className="block truncate font-normal group-data-selected:font-semibold">{shipmentType.name}</span>

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

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="estimatedDate" className="block text-sm/6 font-medium text-gray-900">
                                                        ETD :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="estimatedDate"
                                                        name="estimatedDate"
                                                        type="date"
                                                        placeholder="Masukkan nama shipper"
                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="containerNumber" className="block text-sm/6 font-medium text-gray-900">
                                                        Nomor Container :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="containerNumber"
                                                        name="containerNumber"
                                                        type="text"
                                                        placeholder="Masukkan nomor container"
                                                        className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center w-1/2 justify-between mt-4">
                                                <div className="w-1/3">
                                                    <label htmlFor="bookingNumber" className="block text-sm/6 font-medium text-gray-900">
                                                        Nomor Booking :
                                                    </label>
                                                </div>
                                                <div className="w-2/3">
                                                    <input

                                                        id="bookingNumber"
                                                        name="bookingNumber"
                                                        type="text"
                                                        placeholder="Masukkan nomor booking"
                                                        className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-block rounded-md bg-[#1A5098] px-3 py-2 text-center text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A5098] mt-8"
                                    >
                                        Simpan Data shipment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}