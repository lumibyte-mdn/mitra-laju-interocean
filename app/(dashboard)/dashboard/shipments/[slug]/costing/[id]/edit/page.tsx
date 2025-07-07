"use client"

import { usePathname } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { calculateAmount, calculatePaymentToVendor, calculateSubCosting, calculateTotalCost } from "@/lib/utils"

export default function CostingDetail() {
    const [vat,setVat] = useState(false)
    const [incomeTax, setIncomeTax] = useState(false)

    const [costingDetail, setCostingDetail] = useState({
        id: 0,
        vendorName: "",
        price: 0,
        currency: 0,
        localFee: 0,
        freight: 0,
        subCosting: 0,
        reimbursement: 0,
        vat: false,
        incomeTax: false,
        freightPaymentDate: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setCostingDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /**
     * 
     */
    const handleSubmit = async () => {

    }

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white py-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">Edit Data Costing</h1>
                                    <p className="mt-1 text-sm text-gray-700 w-1/2">Edit data costing.</p>
                                </div>
                            </div>

                            <div className="overflow-y-auto max-h-[66vh] mt-8">
                                <div className="mb-4">
                                    <h1 className="text-lg font-semibold text-[#1A5098]">Costing</h1>
                                </div>

                                <div className="bg-slate-50 rounded-xl px-6 py-6">
                                    <div className="flex gap-12">
                                        {/* Left */}
                                        <div className="w-1/2">
                                            <form className="mt-8" onSubmit={handleSubmit}>
                                                <div className="flex items-center justify-between">
                                                    <div className="w-1/3">
                                                        <label className="block text-sm/6 font-medium text-gray-900">
                                                            Vendor :
                                                        </label>
                                                    </div>
                                                    <div className="w-2/3">
                                                        <input
                                                            name="vendorName"
                                                            type="text"
                                                            onChange={handleChange}
                                                            placeholder="Masukkan nama vendor"
                                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Price :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                onChange={handleChange}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">Currency :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="currency"
                                                                id="currency"
                                                                onChange={handleChange}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mt-4">
                                                    <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900 mt-2">Amount :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="amount"
                                                                readOnly
                                                                disabled
                                                                id="amount"
                                                                value={calculateAmount(costingDetail.price.toString(), costingDetail.currency.toString())}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-xs text-gray-500">*Price x Currency x Qty</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="localFee" className="block text-sm/6 font-medium text-gray-900">Local Fee :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="localFee"
                                                                onChange={handleChange}
                                                                id="localFee"
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="freight" className="block text-sm/6 font-medium text-gray-900">PPN 1% Freight :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="freight"
                                                                id="freight"
                                                                onChange={handleChange}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="subCosting" className="block text-sm/6 font-medium text-gray-900">Sub Costing :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="subCosting"
                                                                id="subCosting"
                                                                disabled
                                                                readOnly
                                                                value={calculateSubCosting(costingDetail.price.toString(), costingDetail.currency.toString(), costingDetail.localFee.toString(), costingDetail.freight.toString())}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <label htmlFor="reimbursement" className="block text-sm/6 font-medium text-gray-900">Reimbursement :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="reimbursement"
                                                                id="reimbursement"
                                                                onChange={handleChange}
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex gap-12 items-center justify-between">
                                                    <div>
                                                        <label htmlFor="paymentvendor" className="block text-sm/6 font-medium text-gray-900">Pajak :</label>
                                                    </div>
                                                    <div className="flex gap-8 w-2/3">
                                                        <div className="flex gap-2 relative">
                                                            <div className="flex items-center justify-start">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        id="vat"
                                                                        name="vat"
                                                                        type="checkbox"
                                                                        onChange={() => setVat(!vat)}
                                                                        aria-describedby="candidates-description"
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-[#1A5098] checked:bg-[#1A5098] indeterminate:border-[#1A5098] indeterminate:bg-[#1A5098] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A5098] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <label htmlFor="vat" className="font-medium text-gray-900">
                                                                    PPN (1.1%)
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2 relative">
                                                            <div className="flex items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        id="incomeTax"
                                                                        name="incomeTax"
                                                                        type="checkbox"
                                                                        onChange={() => setIncomeTax(!incomeTax)}
                                                                        aria-describedby="candidates-description"
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-[#1A5098] checked:bg-[#1A5098] indeterminate:border-[#1A5098] indeterminate:bg-[#1A5098] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A5098] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                    />
                                                                    <svg
                                                                        fill="none"
                                                                        viewBox="0 0 14 14"
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                    >
                                                                        <path
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                        />
                                                                        <path
                                                                            d="M3 7H11"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm/6">
                                                                <label htmlFor="incomeTax" className="font-medium text-gray-900">
                                                                    PPH 23 (2%)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mt-6">
                                                    <label htmlFor="totalcost" className="block text-sm/6 font-medium text-gray-900 mt-2">Total Costing :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="totalcost"
                                                                id="totalcost"
                                                                readOnly
                                                                value={calculateTotalCost(costingDetail.price.toString(), costingDetail.currency.toString(), costingDetail.localFee.toString(), costingDetail.freight.toString(), costingDetail.reimbursement.toString(), costingDetail.vat)}
                                                                disabled
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-xs text-gray-500">*Sub Costing + Reimbursement + Pajak</p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between mt-4">
                                                    <label htmlFor="paymentvendor" className="block text-sm/6 font-medium text-gray-900 mt-2">Payment to Vendor :</label>
                                                    <div className="w-2/3">
                                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                            <input
                                                                type="text"
                                                                name="paymentvendor"
                                                                id="paymentvendor"
                                                                value={calculatePaymentToVendor(costingDetail.price.toString(), costingDetail.currency.toString(), costingDetail.localFee.toString(), costingDetail.reimbursement.toString(), costingDetail.freight.toString(), costingDetail.vat, costingDetail.incomeTax)}
                                                                readOnly
                                                                disabled
                                                                className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                placeholder="0.00"
                                                            />
                                                        </div>
                                                        <p className="mt-1 text-xs text-gray-500">*Total Costing - PPH 23</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="w-1/3">
                                                        <label htmlFor="freightPaymentDate" className="block text-sm/6 font-medium text-gray-900">
                                                            Freight Payment Date :
                                                        </label>
                                                    </div>
                                                    <div className="w-2/3">
                                                        <input
                                                            id="freightPaymentDate"
                                                            name="freightPaymentDate"
                                                            onChange={handleChange}
                                                            type="date"
                                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                        />
                                                    </div>
                                                </div>

                                                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] mt-5 sm:w-auto">Tambah Costing</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}