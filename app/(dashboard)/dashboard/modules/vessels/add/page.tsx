export default function AddVessel() {
    return (
        <>
            <div className="px-4 sm:px-0">
                <h3 className="text-base/7 font-semibold text-gray-900">Vessel Information</h3>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Create new vessel details.</p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <form>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Vessel Name</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="portName" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Mitra Laju" />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Voyage</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="text" name="country" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="123A" />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Estimated Time of Departure</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="date" name="country" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Indonesia" />
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Cutoff Date</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <input type="date" name="country" className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Indonesia" />
                            </dd>
                        </div>
                    </dl>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-5"
                    >
                        Submit New Vessel
                    </button>
                </form>
            </div>
        </>
    )
}