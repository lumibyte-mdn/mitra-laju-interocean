"use client"

import { PortFormValidation } from "@/lib/validation"
import { PortForm } from "@/lib/interface"

import clsx from "clsx"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Timeout from "@/components/timeout"

export default function AddPortLocation() {
    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const [ visible, setVisible ] = useState<boolean>(false)

    const [ error, setError ] = useState<PortForm>({
        portName: "",
        country: ""
    })

    /**
     * Submitting the new port location input by
     * users to the database. Redirect to port locations page
     * if the submission is successful.
     *
     * POST: /api/port-locations
     *
     * @param e - Input from the form
     * @returns - none
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true)

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        // Validates the form before sending it to the backend
        const validate = PortFormValidation(formData)

        if (!validate[1]) {
            setError(validate[0] as PortForm)
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch("/api/port-locations", {
                method: "POST",
                body: formData
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to submit data.")
            }

            if (data.success) {
                router.push("/dashboard/modules/port-locations")
            }
        } catch (err) {
            setVisible(true)
            setIsLoading(false)
        }
    }

    return (
        <>
            {Timeout(visible, "Failed to submit data!", "Please re-submit your form. This happens due to poor internet connection.")}

            <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Port Location Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create new port location details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <form onSubmit={handleSubmit}>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Port Name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="portName" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border", error.portName != "" ? "border-red-500" : "border-gray-300") }placeholder="Belawan" />
                                { error.portName && <p className="text-red-500 text-xs mt-1">{error.portName}</p> }
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Country</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="country" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border", error.country != "" ? "border-red-500" : "border-gray-300")} placeholder="Indonesia" />
                                { error.country && <p className="text-red-500 text-xs mt-1">{error.country}</p> }
                            </dd>
                        </div>
                    </dl>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-indigo-600 mx-4 md:mx-0 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                    >
                        {
                            isLoading ?
                            "Submitting ..."
                            :
                            "Submit New Port"
                        }
                    </button>
                </form>
            </div>
        </>
    )
}