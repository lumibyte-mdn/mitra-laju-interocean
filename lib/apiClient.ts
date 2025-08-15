export const fetchAPI = async (apiRoute: string, method: string, formData?: FormData) => {
    try {
        const res = await fetch(`${apiRoute}`, {
            method: method,
            body: formData
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error("Failed to fetch data.")
        }

        return data
    } catch (err) {
        console.error(err)
    }
}