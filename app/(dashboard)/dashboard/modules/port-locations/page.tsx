"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Port } from "@/lib/interface"
import { transformDate } from "@/lib/utils"
import { fetchAPI } from "@/lib/apiClient"

import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const portLoading = [1, 2, 3, 4 ,5 ]

export default function PortLocations() {
    const [ ports, setPorts ] = useState<Port[]>([])

    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    const load = async () => {
        const data = await fetchAPI("/api/port-locations", "GET")
        
        setPorts(data.ports)
        setIsLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">Port Locations</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the port locations in your database including their city, country, created date and active status.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        href="/dashboard/modules/port-locations/add"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Port Location
                    </Link>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Port Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Country
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Date Created
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    isLoading ?
                                    portLoading.map((p, index) => (
                                        <tr key={index}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <Skeleton width={120} />
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <Skeleton width={75} />
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <Skeleton width={50} />
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                <Skeleton width={25} />
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    ports.map((port: Port, index) => (
                                        <tr key={index}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                                {port.portName}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{port.country}</td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{transformDate(port.createdAt?.split("T")[0] as string)}</td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{port.isActive ? "Active" : "Inactive"}</td>
                                            <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                                            <Link href={`/dashboard/modules/port-locations/${port.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only"></span>
                                            </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}