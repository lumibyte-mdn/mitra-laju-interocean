"use client"

import { Vessel, VesselForm } from "@/lib/interface"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import clsx from "clsx"
import { fetchAPI } from "@/lib/apiClient"
import { usePathname, useRouter } from "next/navigation"
import { validateVesselForm } from "@/lib/formValidation"

import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'


export default function VesselDetails() {
    const path = usePathname()
    const router = useRouter()

    const [ vesselDetails, setVesselDetails ] = useState<Vessel>({
        id: "",
        vesselName: "",
        voyage: "",
        etd: "",
        cutOffDate: "",
        isActive: true
    })

    const [ errors, setErrors ] = useState<Record<string, string>>({})
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isLoadingSubmit, setIsLoadingSubmit ] = useState<boolean>(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoadingSubmit(true)

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const { valid, errors } = validateVesselForm(formData)

        if (!valid) {
            setErrors(errors)
            setIsLoadingSubmit(false)

            return
        }

        const data = await fetchAPI(`/api/vessels/${path.split("/")[4]}`, "PUT", formData)

        if (data.success) {
            router.push("/dashboard/modules/vessels")
        }

        setIsLoadingSubmit(false)
    }

    const load = async () => {
        const data = await fetchAPI(`/api/vessels/${path.split("/")[4]}`, "GET")

        console.log(data)

        setVesselDetails(data.vesselDetails)
        setIsLoading(false)
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setVesselDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Vessel Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create new vessel details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <form onSubmit={handleSubmit}>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Vessel Name</dt>
                            {
                                isLoading ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="text" name="vesselName" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", errors.vesselName === undefined ? "border-gray-300" : "border-red-500")} placeholder="Mitra Laju" value={vesselDetails.vesselName} onChange={handleChange}/>
                                    { errors.vesselName && <p className="text-red-500 mt-1 text-xs">{errors.vesselName}</p> }
                                </dd>
                            }
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Voyage</dt>
                            {
                                isLoading ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="text" name="voyage" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", errors.voyage === undefined ? "border-gray-300" : "border-red-500")} placeholder="123A" value={vesselDetails.voyage} onChange={handleChange}/>
                                    { errors.voyage && <p className="text-red-500 mt-1 text-xs">{errors.voyage}</p> }
                                </dd>
                            }
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Estimated Time of Departure</dt>
                            {
                                isLoading ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="date" name="etd" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-gray-300" placeholder="Indonesia" value={vesselDetails.etd == null ? "" : vesselDetails.etd.split("T")[0]} onChange={handleChange}/>
                                </dd>
                            }
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Cutoff Date</dt>
                            {
                                isLoading ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="date" name="cutOffDate" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-gray-300" placeholder="Indonesia" value={vesselDetails.cutOffDate == null ? "" : vesselDetails.cutOffDate.split("T")[0]} onChange={handleChange}/>
                                </dd>
                            }
                        </div>
                    </dl>

                    <button
                        type="submit"
                        disabled={isLoadingSubmit}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                    >
                        {
                            isLoadingSubmit ? "Submitting..." : "Edit Vessel"
                        }
                    </button>
                </form>
            </div>
        </>
    )
}