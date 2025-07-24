"use client"

import Timeout from "@/components/timeout"

import { VesselForm } from "@/lib/interface"
import { VesselFormValidation } from "@/lib/validation"

import { FormEvent, useState } from "react"

import clsx from "clsx"
import { useRouter } from "next/navigation"

export default function AddVessel() {
    const router = useRouter()

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ visible, setVisible ] = useState<boolean>(false)

    const [ error, setError ] = useState<VesselForm>({
        vesselName: "",
        voyage: "",
        etd: "",
        cutOffDate: ""
    })

    /**
     * Submitting the new vessel input by user to the
     * database. Redirect to vessel page if form is successfully
     * submitted.
     *
     * @param e - Input from the form
     * @returns - none
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true)

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const validate = VesselFormValidation(formData)

        if (!validate[1]) {
            setError(validate[0] as VesselForm)
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch("/api/vessels", {
                method: "POST",
                body: formData
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to submit data.")
            }

            if (data.success) {
                router.push("/dashboard/modules/vessels")
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
                <h3 className="text-base/7 font-semibold text-gray-900">Vessel Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create new vessel details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <form onSubmit={handleSubmit}>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Vessel Name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="vesselName" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", error.vesselName != "" ? "border-red-500" : "border-gray-300")} placeholder="Mitra Laju" />
                                { error.vesselName && <p className="text-red-500 mt-1 text-xs">{error.vesselName}</p> }
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Voyage</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="voyage" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", error.voyage != "" ? "border-red-500" : "border-gray-300")} placeholder="123A" />
                                { error.voyage && <p className="text-red-500 mt-1 text-xs">{error.voyage}</p> }
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Estimated Time of Departure</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="date" name="etd" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", error.etd != "" ? "border-red-500" : "border-gray-300")} placeholder="Indonesia" />
                                { error.etd && <p className="text-red-500 mt-1 text-xs">{error.etd}</p> }
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Cutoff Date</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="date" name="cutOffDate" className={clsx("block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6", error.cutOffDate != "" ? "border-red-500" : "border-gray-300")} placeholder="Indonesia" />
                                { error.cutOffDate && <p className="text-red-500 mt-1 text-xs">{error.cutOffDate}</p> }
                            </dd>
                        </div>
                    </dl>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                    >
                        {
                            isLoading ? "Submitting..." : "Submit New Vessel"
                        }
                    </button>
                </form>
            </div>
        </>
    )
}