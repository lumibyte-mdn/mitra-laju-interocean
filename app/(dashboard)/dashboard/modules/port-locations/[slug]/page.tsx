"use client"

import { fetchAPI } from "@/lib/apiClient"
import { validatePortForm } from "@/lib/formValidation"
import { Port } from "@/lib/interface"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export default function PortLocationDetails() {
    const path = usePathname()
    const router = useRouter()

    const [ portDetail, setPortDetail ] = useState<Port>({
        id: "",
        portName: "",
        country: "",
        isActive: true
    })
    const [ errors, setErrors ] = useState<Record<string, string>>({})

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isLoadingDetails, setIsLoadingDetails ] = useState<boolean>(true)
    
    const load = async () => {
        const data = await fetchAPI(`/api/port-locations/${path.split("/")[4]}`, "GET")

        setPortDetail(data.portDetails)
        setIsLoadingDetails(false)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        console.log(name, value)

        setPortDetail(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const { valid, errors } = validatePortForm(formData)

        if (!valid) {
            setErrors(errors)
            setIsLoading(false)
            return
        }

        const data = await fetchAPI(`/api/port-locations/${path.split("/")[4]}`, "PUT", formData)

        console.log(data.status)

        if (data.success) {
            router.push("/dashboard/modules/port-locations")
        }

        setIsLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Port Location Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Detailed information of port location.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <form onSubmit={handleSubmit}>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Port Name</dt>
                            {
                                isLoadingDetails ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="text" name="portName" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border", errors.portName === undefined ? "border-gray-300" : "border-red-500") } placeholder="Belawan" value={portDetail.portName} onChange={handleChange}/>
                                </dd>
                            }
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Country</dt>
                            {
                                isLoadingDetails ?
                                <Skeleton width={200} />
                                :
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <input type="text" name="country" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border", errors.country === undefined ? "border-gray-300" : "border-red-500")} placeholder="Indonesia" value={portDetail.country} onChange={handleChange}/>
                                    { errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p> }
                                </dd>
                            }
                        </div>
                    </dl>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                    >
                        { isLoading ? "Submitting..." : "Edit Port"}
                    </button>
                </form>
            </div>
        </>
    )
}