"use client"

import { Costing } from "@/lib/interface"
import { usePathname } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { dataCostingTotal, dataCostingVendorPayment, transformDate, calculateAmount, calculatePaymentToVendor, calculateSubCosting, calculateTotalCost } from "@/lib/utils"

export default function ShipmentCosting() {
    const path = usePathname()

    const [shipmentQty, setShipmentQty] = useState(0)
    const [shipmentCostings, setShipmentCostings] = useState([])
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Tracking changes for frontend re-render
    const [input, setInput]  = useState({
        shipmentId: "",
        vendorName: "",
        price: "",
        currency: "",
        localFee: "",
        reimbursement: "",
        freight: "",
        freightPaymentDate: "",
        vat: false,
        incomeTax: false,
        subCosting: 0,
    })

    // Checkbox for taxes
    const [vat, setVat] = useState(false)
    const [incomeTax, setIncomeTax] = useState(false)

    /**
     * Keeps track of the changes made to
     * the amount of price * currency
     * @param e
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name == "vat") {
            setInput(prev => ({
                ...prev,
                [name]: !vat
            }))
            setVat(!vat)

            return
        }

        if (name == "incomeTax") {
            setInput(prev => ({
                ...prev,
                [name]: !incomeTax
            }))
            setIncomeTax(!incomeTax)

            return
        }

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const toggleAccordion = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    /**
     * This function handles the submission of the
     * costing data into a certain shipment.
     *
     * @params e
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        input['vat'] = vat
        input['shipmentId'] = path.split("/")[3]
        input['incomeTax'] = incomeTax
        input['subCosting'] = (parseInt(input.price) * parseInt(input.currency) * shipmentQty) + parseInt(input.localFee) + parseInt(input.freight)

        try {
            const res = await fetch("/api/costings", {
                method: "POST",
                body: JSON.stringify(input)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to submit data.")
            }

            if (data.success) {
                location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    /**
     * Fetches the updates of the costing saved
     * by the user
     */
    const fetchShipmentCosting = async () => {
        try {
            const res = await fetch("/api/shipment-costings", {
                method: "POST",
                body: JSON.stringify({
                    shipmentId: path.split("/")[3]
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to fetch data.")
            }

            if (data.success) {
                setShipmentCostings(data.shipmentCostings)
                setShipmentQty(data.shipmentQty.qty)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchShipmentCosting()
    }, [])

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white py-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">Tambah Data Shipment Costing</h1>
                                    <p className="mt-1 text-sm text-gray-700 w-1/2">Tambah data costing pada shipment ABCD.</p>
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
                                                                value={calculateAmount(input.price, input.currency, shipmentQty)}
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
                                                                value={calculateSubCosting(input.price, input.currency, input.localFee, input.freight, shipmentQty)}
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
                                                                        onChange={handleChange}
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
                                                                        onChange={handleChange}
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
                                                                value={calculateTotalCost(input.price, input.currency, input.localFee, input.freight, input.reimbursement, input.vat, shipmentQty)}
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
                                                                value={calculatePaymentToVendor(input.price, input.currency, input.localFee, input.reimbursement, input.freight, input.vat, input.incomeTax, shipmentQty)}
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

                                        {/* Right */}
                                        <div className="w-1/2">
                                            <div className="bg-white py-4 px-6 rounded-lg">
                                                <div>
                                                    <div className="mb-4">
                                                        <h1 className="text-lg font-semibold text-[#1A5098]">Data Costing</h1>
                                                    </div>
                                                </div>

                                                {
                                                    shipmentCostings.length == 0
                                                    ?
                                                    <div className="bg-white text-gray-300 text-center py-6">
                                                        <div className="flex flex-col items-center">
                                                            <div className="mb-4">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-20">
                                                                    <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                                                                    <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                                                                    <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                                                                    <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                                                                </svg>
                                                            </div>
                                                            <h1 className="font-bold text-lg text-gray-400">Tidak ada data.</h1>
                                                            <p className="font-normal text-sm mt-2 w-2/3 text-gray-400">Data costing tidak tersedia saat ini. Tambah data costing terlebih dahulu.</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        {
                                                            shipmentCostings.map((shipmentCosting: Costing, index) => (
                                                                <div key={index} className="mb-2 border border-[#1A5098] rounded-lg overflow-hidden">
                                                                    <button
                                                                        onClick={() => toggleAccordion(index)}
                                                                        className="w-full text-left px-4 py-2 bg-[#1A5098] hover:bg-[#1a5198df] text-white"
                                                                    >{shipmentCosting.vendorName}</button>

                                                                    {/* Accordion Dropdown */}
                                                                    {openIndex === index && (
                                                                        <div className="px-4 py-3">
                                                                            <div>
                                                                                <label htmlFor="vendor" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Vendor :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={shipmentCosting.vendorName}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Price :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.price}`}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Currency :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.currency}`}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Amount :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${(shipmentCosting.price * shipmentCosting.currency).toLocaleString()}`}
                                                                                    readOnly
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="localfee" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Local Fee :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.localFee}`}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="ppnfreight" className="block text-sm/6 font-medium text-gray-900">
                                                                                    PPN 1% Freight :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.freight}`}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="subcosting" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Sub Costing :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.subCosting.toLocaleString()}`}
                                                                                    readOnly
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="reimbursement" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Reimbursement :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${shipmentCosting.reimbursement}`}
                                                                                    disabled
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="totalcost" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Total Costing :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${dataCostingTotal(shipmentCosting.price, shipmentCosting.currency, shipmentQty, shipmentCosting.freight, shipmentCosting.localFee, shipmentCosting.reimbursement, shipmentCosting.vat)}`}
                                                                                    readOnly
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="paymentvendor" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Payment to Vendor :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${dataCostingVendorPayment(shipmentCosting.price, shipmentCosting.currency, shipmentQty, shipmentCosting.freight, shipmentCosting.localFee, shipmentCosting.reimbursement, shipmentCosting.vat, shipmentCosting.incomeTax)}`}
                                                                                    readOnly
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="paymentvendor" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Freight Payment Date :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    readOnly
                                                                                    value={transformDate(shipmentCosting.freightPaymentDate.split("T")[0])}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                }
                                            </div>
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