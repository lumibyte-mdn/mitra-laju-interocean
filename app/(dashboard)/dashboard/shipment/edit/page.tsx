"use client"

import tipeshipment from "@/lib/tipeshipment";
import ukuranmenu from "@/lib/ukuranmenu";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";

import { useEffect, useState } from "react";

export default function shipmentEdit() {
    const [selectedUkuran, setSelectedUkuran] = useState(ukuranmenu[0]);
    const [selectedTipe, setSelectedTipe] = useState(tipeshipment[0]);
    const [selectedTaxes, setSelectedTaxes] = useState<number[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [costings, setCostings] = useState<{
        vendor: string;
        price: string;
        currency: string;
        amount: string;
        localfee: string;
        ppnfreight: string;
        subcosting: string;
        reimbursement: string;
        totalcost: string;
        paymentvendor: string;
        paymentdate: string;
    }[]>([]);

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const totalTaxPercent = selectedTaxes.reduce((acc, curr) => acc + curr, 0);

    const parseNumber = (value: string) => parseInt(value.replace(/\./g, '') || '0', 10);

    const [vendor, setVendor] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [subcosting, setSubCosting] = useState('')
    const [reimbursement, setReimbursement] = useState('')
    const [totalcost, setTotalCost] = useState('')
    const [paymentvendor, setPaymentVendor] = useState('')
    const [localfee, setLocalFee] = useState('')
    const [ppnfreight, setPpnFreight] = useState('')
    const [paymentdate, setPaymentDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (vendor && price && currency && amount && localfee && ppnfreight && subcosting && reimbursement && totalcost && paymentvendor && paymentdate) {
            setCostings(prev => [...prev,
            {
                vendor,
                price,
                currency,
                amount,
                localfee,
                ppnfreight,
                subcosting,
                reimbursement,
                totalcost,
                paymentvendor,
                paymentdate
            }]);
            setVendor('');
            setPrice('');
            setCurrency('');
            setAmount('');
            setLocalFee('');
            setPpnFreight('');
            setSubCosting('');
            setReimbursement('');
            setTotalCost('');
            setPaymentVendor('');
            setPaymentDate('');
            setOpenIndex(null);
        }
    };

    const toggleAccordion = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    const handleTaxCheckboxChange = (value: number) => {
        setSelectedTaxes((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    // Hitung total setiap ada perubahan
    useEffect(() => {
        const total = parseNumber(price) * parseNumber(qty) * parseNumber(currency);
        const formatted = total.toLocaleString('id-ID');
        setAmount(formatted);

        const totalcost = (parseNumber(subcosting) + parseNumber(reimbursement)) * (1 + totalTaxPercent / 100);
        const formatted1 = totalcost.toLocaleString('id-ID');
        setTotalCost(formatted1)

        const paymentvendor = totalcost - (totalcost * 2 / 100);
        const formatted2 = paymentvendor.toLocaleString('id-ID');
        setPaymentVendor(formatted2)
    },
        [price, qty, currency, subcosting, reimbursement, selectedTaxes]);

    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = () => {
        // Simulasikan penyimpanan data, bisa ganti dengan fetch/axios post di sini
        alert("Data berhasil disimpan!");
        setIsEditing(false);
    };

    return (
        <>
            <div className="mx-8 my-8">
                <div className="bg-white py-8 rounded-lg">
                    <div className="mx-auto">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-xl font-semibold text-gray-900">Edit Data Shipment</h1>
                                    <p className="mt-1 text-sm text-gray-700 w-1/2">Edit formulir Pengelolaan Data Shipment.</p>
                                </div>

                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleCancelClick}
                                            data-autofocus
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveClick}
                                            className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                                        >
                                            Simpan
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleEditClick}
                                        className="inline-flex w-full justify-center rounded-md bg-[#1A5098] px-3 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#1a5198eb] sm:ml-3 sm:w-auto"
                                    >
                                        Edit data shipment
                                    </button>
                                )}
                            </div>

                            <div className="overflow-y-auto  max-h-[66vh] mt-8">
                                {/* data shipment */}
                                <div>
                                    <div>
                                        <div className="mb-4">
                                            <h1 className="text-lg font-semibold text-[#1A5098]">Data Shipment</h1>
                                        </div>
                                        <div className="flex items-center w-1/2 justify-between">
                                            <div className="w-1/3">
                                                <label htmlFor="nomororderan" className="block text-sm/6 font-medium text-gray-900">
                                                    Nomor Orderan :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input

                                                    id="nomororderan"
                                                    name="nomororderan"
                                                    type="number"
                                                    min={0}
                                                    disabled={!isEditing}
                                                    onKeyDown={(e) => {
                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
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
                                                    disabled={!isEditing}
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
                                                    disabled={!isEditing}
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
                                                <label htmlFor="bataswaktu" className="block text-sm/6 font-medium text-gray-900">
                                                    Due Date :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    disabled={!isEditing}
                                                    id="bataswaktu"
                                                    name="bataswaktu"
                                                    type="date"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* operational */}
                                <div>
                                    <div className="mt-8">
                                        <div className="mb-4">
                                            <h1 className="text-lg font-semibold text-[#1A5098]">Operational</h1>
                                        </div>
                                        <div className="flex items-center w-1/2 justify-between">
                                            <div className="w-1/3">
                                                <label htmlFor="kodecustomer" className="block text-sm/6 font-medium text-gray-900">
                                                    Kode Customer :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    disabled={!isEditing}
                                                    id="kodecustomer"
                                                    name="kodecustomer"
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
                                                    disabled={!isEditing}
                                                    id="qty"
                                                    min={0}
                                                    name="qty"
                                                    value={qty}
                                                    type="text"
                                                    inputMode="numeric"
                                                    onKeyDown={(e) => {
                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    pattern="[0-9]*"
                                                    onChange={(e) => {
                                                        // Ambil hanya angka
                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                        // Format ke ribuan
                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                        // Update nilai input
                                                        e.target.value = formattedValue;
                                                        setQty(formattedValue);
                                                    }}
                                                    placeholder="Masukkan nama customer"
                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center w-1/2 justify-between mt-4">
                                            <div className="w-1/3">
                                                <label htmlFor="ukuran" className="block text-sm/6 font-medium text-gray-900">
                                                    Ukuran :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <Listbox value={selectedUkuran} onChange={setSelectedUkuran} disabled={!isEditing}>
                                                    <div className="relative">
                                                        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                            <span className="col-start-1 row-start-1 truncate pr-6">{selectedUkuran?.ukuran}</span>
                                                            <ChevronUpDownIcon
                                                                aria-hidden="true"
                                                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                            />
                                                        </ListboxButton>
                                                        <ListboxOptions
                                                            transition
                                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                        >
                                                            {ukuranmenu.map((ukuranmenu) => (
                                                                <ListboxOption
                                                                    key={ukuranmenu.id}
                                                                    value={ukuranmenu}
                                                                    className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                                >
                                                                    <span className="block truncate font-normal group-data-selected:font-semibold">{ukuranmenu.ukuran}</span>

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
                                                    disabled={!isEditing}
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
                                                    disabled={!isEditing}
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
                                                <label htmlFor="tipeshipment" className="block text-sm/6 font-medium text-gray-900">
                                                    Tipe Shipment :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <Listbox value={selectedTipe} onChange={setSelectedTipe} disabled={!isEditing}>
                                                    <div className="relative">
                                                        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6">
                                                            <span className="col-start-1 row-start-1 truncate pr-6">{selectedTipe?.ukuran}</span>
                                                            <ChevronUpDownIcon
                                                                aria-hidden="true"
                                                                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                            />
                                                        </ListboxButton>

                                                        <ListboxOptions
                                                            transition
                                                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                                                        >
                                                            {tipeshipment.map((tipeshipment) => (
                                                                <ListboxOption
                                                                    key={tipeshipment.id}
                                                                    value={tipeshipment}
                                                                    className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#1A5098] data-focus:text-white data-focus:outline-hidden"
                                                                >
                                                                    <span className="block truncate font-normal group-data-selected:font-semibold">{tipeshipment.ukuran}</span>

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
                                                <label htmlFor="ETD" className="block text-sm/6 font-medium text-gray-900">
                                                    ETD :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    disabled={!isEditing}
                                                    id="ETD"
                                                    name="ETD"
                                                    type="date"
                                                    placeholder="Masukkan nama shipper"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center w-1/2 justify-between mt-4">
                                            <div className="w-1/3">
                                                <label htmlFor="nomorcontainer" className="block text-sm/6 font-medium text-gray-900">
                                                    Nomor Container :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    disabled={!isEditing}
                                                    id="nomorcontainer"
                                                    name="nomorcontainer"
                                                    type="number"
                                                    placeholder="Masukkan nomor container"
                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center w-1/2 justify-between mt-4">
                                            <div className="w-1/3">
                                                <label htmlFor="nomorbooking" className="block text-sm/6 font-medium text-gray-900">
                                                    Nomor Booking :
                                                </label>
                                            </div>
                                            <div className="w-2/3">
                                                <input
                                                    disabled={!isEditing}
                                                    id="nomorbooking"
                                                    name="nomorbooking"
                                                    type="number"
                                                    placeholder="Masukkan nomor booking"
                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* costing */}
                                <div className="mt-8">
                                    <div className="mb-4">
                                        <h1 className="text-lg font-semibold text-[#1A5098]">Costing</h1>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl px-6 py-6">
                                        <div className="flex gap-12">
                                            <div className="w-1/2">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="w-1/3">
                                                            <label htmlFor="vendor" className="block text-sm/6 font-medium text-gray-900">
                                                                Vendor :
                                                            </label>
                                                        </div>
                                                        <div className="w-2/3">
                                                            <input
                                                                disabled={!isEditing}
                                                                value={vendor}
                                                                id="vendor"
                                                                name="vendor"
                                                                type="text"
                                                                placeholder="Masukkan nama vendor"
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                onChange={(e) => setVendor(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Price :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    disabled={!isEditing}
                                                                    type="text"
                                                                    name="price"
                                                                    id="price"
                                                                    inputMode="numeric"
                                                                    min={0}
                                                                    value={price}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        setPrice(formattedValue)

                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">Currency :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    disabled={!isEditing}
                                                                    value={currency}
                                                                    type="text"
                                                                    name="currency"
                                                                    id="currency"
                                                                    inputMode="numeric"
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        e.target.value = formattedValue;
                                                                        setCurrency(formattedValue);
                                                                    }}
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
                                                                    value={amount}
                                                                    readOnly
                                                                    disabled
                                                                    id="amount"
                                                                    inputMode="numeric"
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        let rawValue = e.target.value.replace(/\D/g, '');
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                                                        e.target.value = formattedValue;
                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00"
                                                                />
                                                            </div>
                                                            <p className="mt-1 text-xs text-gray-500">*Price x Currency x Qty</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="localfee" className="block text-sm/6 font-medium text-gray-900">Local Fee :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    value={localfee}
                                                                    type="text"
                                                                    name="localfee"
                                                                    id="localfee"
                                                                    inputMode="numeric"
                                                                    disabled={!isEditing}
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        e.target.value = formattedValue;
                                                                        setLocalFee(formattedValue)
                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="ppnfreight" className="block text-sm/6 font-medium text-gray-900">PPN 1% Freight :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    value={ppnfreight}
                                                                    type="text"
                                                                    name="ppnfreight"
                                                                    id="ppnfreight"
                                                                    inputMode="numeric"
                                                                    disabled={!isEditing}
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        e.target.value = formattedValue;
                                                                        setPpnFreight(formattedValue)
                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="subcosting" className="block text-sm/6 font-medium text-gray-900">Sub Costing :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    value={subcosting}
                                                                    type="text"
                                                                    name="subcosting"
                                                                    id="subcosting"
                                                                    disabled={!isEditing}
                                                                    inputMode="numeric"
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        e.target.value = formattedValue;
                                                                        setSubCosting(formattedValue)
                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <label htmlFor="reimbursement" className="block text-sm/6 font-medium text-gray-900">Reimbursement :</label>
                                                        <div className="w-2/3">
                                                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#1A5098]">
                                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Rp.</div>
                                                                <input
                                                                    value={reimbursement}
                                                                    type="text"
                                                                    name="reimbursement"
                                                                    id="reimbursement"
                                                                    disabled={!isEditing}
                                                                    inputMode="numeric"
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        // Ambil hanya angka
                                                                        let rawValue = e.target.value.replace(/\D/g, '');

                                                                        // Format ke ribuan
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                                                        // Update nilai input
                                                                        e.target.value = formattedValue;
                                                                        setReimbursement(formattedValue)
                                                                    }}
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
                                                                            id="candidates"
                                                                            name="candidates"
                                                                            value={1.1}
                                                                            disabled={!isEditing}
                                                                            onChange={(e) => handleTaxCheckboxChange(1.1)}
                                                                            type="checkbox"
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
                                                                    <label htmlFor="candidates" className="font-medium text-gray-900">
                                                                        PPN (1.1%)
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2 relative">
                                                                <div className="flex items-center">
                                                                    <div className="group grid size-4 grid-cols-1">
                                                                        <input
                                                                            id="candidates"
                                                                            name="candidates"
                                                                            onChange={(e) => handleTaxCheckboxChange(2)}
                                                                            value={2}
                                                                            type="checkbox"
                                                                            disabled={!isEditing}
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
                                                                    <label htmlFor="candidates" className="font-medium text-gray-900">
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
                                                                    value={totalcost}
                                                                    type="text"
                                                                    name="totalcost"
                                                                    id="totalcost"
                                                                    inputMode="numeric"
                                                                    readOnly
                                                                    disabled
                                                                    min={0}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        let rawValue = e.target.value.replace(/\D/g, '');
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                                                        e.target.value = formattedValue;
                                                                        setTotalCost(formattedValue)
                                                                    }}
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
                                                                    inputMode="numeric"
                                                                    value={paymentvendor}
                                                                    min={0}
                                                                    readOnly
                                                                    disabled
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                    onChange={(e) => {
                                                                        let rawValue = e.target.value.replace(/\D/g, '');
                                                                        let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                                                        e.target.value = formattedValue;
                                                                        setPaymentVendor(formattedValue)
                                                                    }}
                                                                    className="no-spinner block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    placeholder="0.00"
                                                                />
                                                            </div>
                                                            <p className="mt-1 text-xs text-gray-500">*Total Costing - PPH 23</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <div className="w-1/3">
                                                            <label htmlFor="paymentdate" className="block text-sm/6 font-medium text-gray-900">
                                                                Freight Payment Date :
                                                            </label>
                                                        </div>
                                                        <div className="w-2/3">
                                                            <input
                                                                value={paymentdate}
                                                                id="paymentdate"
                                                                disabled={!isEditing}
                                                                name="paymentdate"
                                                                type="date"
                                                                onChange={(e) => setPaymentDate(e.target.value)}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1A5098] sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="w-1/2">
                                                <div className="bg-white py-4 px-6 rounded-lg">
                                                    <div>
                                                        <div className="mb-4">
                                                            <h1 className="text-lg font-semibold text-[#1A5098]">Data Costing</h1>
                                                        </div>
                                                    </div>
                                                    {costings.length === 0 ? (
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
                                                    ) : (
                                                        <div>
                                                            {costings.map((item, index) => (
                                                                <div key={index} className="mb-2 border border-[#1A5098] rounded-lg overflow-hidden">
                                                                    <button
                                                                        onClick={() => toggleAccordion(index)}
                                                                        className="w-full text-left px-4 py-2 bg-[#1A5098] hover:bg-[#1a5198df] text-white"
                                                                    >
                                                                        <h1 className="font-normal">{item.vendor}</h1>
                                                                    </button>
                                                                    {openIndex === index && (
                                                                        <div className="px-4 py-3">
                                                                            <div>
                                                                                <label htmlFor="vendor" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Vendor :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={item.vendor}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Price :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.price}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="currency" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Currency :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.currency}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Amount :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.amount}`}
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
                                                                                    value={`Rp. ${item.localfee}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="ppnfreight" className="block text-sm/6 font-medium text-gray-900">
                                                                                    PPN 1% Freight :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.ppnfreight}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="subcosting" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Sub Costing :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.subcosting}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="reimbursement" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Reimbursement :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.reimbursement}`}
                                                                                    disabled={!isEditing}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="totalcost" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Total Costing :
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={`Rp. ${item.totalcost}`}
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
                                                                                    value={`Rp. ${item.paymentvendor}`}
                                                                                    readOnly
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>

                                                                            <div className="mt-2">
                                                                                <label htmlFor="paymentvendor" className="block text-sm/6 font-medium text-gray-900">
                                                                                    Freight Payment Date :
                                                                                </label>
                                                                                <input
                                                                                    onChange={(e) => setPaymentDate(e.target.value)}
                                                                                    type="text"
                                                                                    value={item.paymentdate}
                                                                                    className="no-spinner block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 disabled:text-gray-400 appearance-none"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
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