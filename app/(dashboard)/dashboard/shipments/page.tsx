"use client"

import { Shipment } from "@/lib/interface";
import { transformDate } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function shipment() {
    const [shipments, setShipments] = useState([])

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedShipmentId, setSelectedShipmentId] = useState<number | null>(null)

    /**
     * This function fetches the shipment data
     */
    const fetchShipments = async () => {
        try {
            const res = await fetch("/api/shipments")
            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to fetch data.")
            }

            if (data.success) {
                setShipments(data.shipments)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchShipments()
    }, [])

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white py-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="sm:flex sm:items-center justify-between">
                                <div>
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Shipment</h1>
                                        <p className="mt-1 text-sm text-gray-700">Seluruh data shipment akan di tampilkan di bagian ini dalam bentuk tabel.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="relative z-0 items-center w-[300]">
                                        <div className="grid w-full grid-cols-1 sm:max-w-xs">
                                            <input type="search" name="search"
                                                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6"
                                                placeholder="Search" />
                                            <svg className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path fillRule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-none">
                                        <Link
                                            href={"/dashboard/shipment/add"}
                                            type="button"
                                            className="block rounded-md bg-[#1A5098] px-3 py-2 text-center text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A5098]"
                                        >
                                            Tambah Shipment
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="-mx-4 mt-8 sm:-mx-0">
                                <div className="overflow-y-auto max-h-[66vh]">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nomor Orderan</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                                    Customer </th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                                    Kode Customer</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                                    Shipper</th>
                                                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                                    Due date</th>
                                                {/* <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                                            <span className="sr-only">Edit</span>
                                                        </th> */}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {
                                                shipments.map((shipment: Shipment) =>
                                                    <tr key={shipment.id}>
                                                        <td
                                                            className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                                            {shipment.orderNumber}
                                                            <dl className="font-normal lg:hidden">
                                                                <dd className="mt-1 truncate text-gray-700">{shipment.customer}</dd>
                                                                <dt className="sr-only sm:hidden">Email</dt>
                                                                <dd className="mt-1 truncate text-gray-500 sm:hidden">{shipment.shipper}</dd>
                                                            </dl>
                                                        </td>
                                                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{shipment.customer}</td>
                                                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{shipment.customerCode}</td>
                                                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{shipment.shipper}</td>
                                                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{transformDate(shipment.dueDate.split("T")[0])}</td>
                                                        <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
                                                            <div className="flex items-center space-x-4">
                                                                <Link
                                                                    href={`/dashboard/shipments/${shipment.id}/costing/add`}
                                                                >
                                                                    Costing
                                                                </Link>
                                                                <Link
                                                                    href={`/dashboard/shipments/${shipment.id}/edit`}
                                                                    className="text-[#1A5098] hover:text-[#1a5198eb]"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#1A5098] hover:text-[#1a3798]">
                                                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                                    </svg>
                                                                </Link>
                                                                <Link
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setSelectedShipmentId(shipment.id);
                                                                        setIsDeleteDialogOpen(true);
                                                                    }}
                                                                    href={"#"}
                                                                    className="text-red-600 hover:text-red-700"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    {/* Delete dialog */}
                                    {isDeleteDialogOpen && selectedShipmentId !== null && (
                                        <Dialog
                                            open={isDeleteDialogOpen}
                                            onClose={() => {
                                                setIsDeleteDialogOpen(false);
                                                setSelectedShipmentId(null);
                                            }}
                                            className="relative z-50"
                                        >
                                            <DialogBackdrop
                                                transition
                                                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                                            />

                                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                    <DialogPanel
                                                        transition
                                                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                                                    >
                                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                            <div className="sm:flex sm:items-start">
                                                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                                                </div>
                                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                                        Hapus Data Shipment
                                                                    </DialogTitle>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            Apakah Anda yakin ingin menghapus data shipment ini? Data akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsDeleteDialogOpen(false);
                                                                    setSelectedShipmentId(null);
                                                                }}
                                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                            >
                                                                Hapus
                                                            </button>
                                                            <button
                                                                type="button"
                                                                data-autofocus
                                                                onClick={() => {
                                                                    setIsDeleteDialogOpen(false);
                                                                    setSelectedShipmentId(null);
                                                                }}
                                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            >
                                                                Batal
                                                            </button>
                                                        </div>
                                                    </DialogPanel>
                                                </div>
                                            </div>
                                        </Dialog>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}