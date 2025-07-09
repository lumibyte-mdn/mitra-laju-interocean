/**
 * This function transforms date in the format of
 * yyyy-mm-dd into Month, Date Year
 * 
 * @param date
 * @returns 
 */
export function transformDate(date: string): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"]
    
    const [year, month, day] = date.split("-")

    return `${months[parseInt(month) - 1]} ${day}, ${year}`
}

/**
 * This function transforms the word into a
 * title case.
 * 
 * @param words 
 * @returns 
 */
export function titleCase(words: string): string {
    return words[0] + words.slice(1).toLocaleLowerCase()
}

/**
 * This function is to help displaying the calculation
 * of value total costing in the frontend 
 * 
 * @param subCosting 
 * @param reimbursement 
 * @param hasVat 
 * @returns 
 */
export const dataCostingTotal = (price: number, currency: number, qty: number, freight: number, localFee: number, reimbursement: number, hasVat: boolean) => {
    const vatPercentage = hasVat ? 0.011 : 0

    return (((price * currency * qty) + localFee + freight) + reimbursement + (((price * currency * qty) + localFee + freight) * vatPercentage)).toLocaleString()
}

/**
 * This function is to help displaying the calculation
 * of value payment to vendor in the frontend
 * 
 * @param subCosting 
 * @param reimbursement 
 * @param hasVat 
 * @param hasIncomeTax 
 * @returns 
 */
export const dataCostingVendorPayment = (price: number, currency: number, qty: number, freight: number, localFee: number, reimbursement: number, hasVat: boolean, hasIncomeTax: boolean) => {
    const vatPercentage = hasVat ? 0.011 : 0
    const incomeTaxPercentage = hasIncomeTax ? 0.02 : 0

    return (((price * currency * qty) + localFee + freight) + reimbursement + (((price * currency * qty) + localFee + freight) * vatPercentage) - (((price * currency * qty) + localFee + freight) * incomeTaxPercentage)).toLocaleString()
}

/**
 * Calculates the amount
 * Formula: Price * Currency * Qty
 * 
 * @returns - number
 */
export const calculateAmount = (price: string, currency: string, qty: number) => {
    if (price == "" || currency == "") {
        return 0
    }

    return (parseInt(price) * parseInt(currency) * qty).toLocaleString()
}

/**
 * Calculates the subcosting amount
 * Formula: Amount + LocalFee + Freight 1%
 * 
 * @returns - number
 */
export const calculateSubCosting = (price: string, currency: string, localFee: string, freight: string, qty: number) => {
    if (localFee == "" || freight == "") {
        return 0
    }

    return ((parseInt(price) * parseInt(currency) * qty) + parseInt(localFee) + parseInt(freight)).toLocaleString()
}

/**
 * Calculates the total cost of a particular costing
 * Formula: SubCosting + Reimbursement + VAT (1.1%) <SubCosting * 1.1%>
 * 
 * @returns - number
 */
export const calculateTotalCost = (price: string, currency: string, localFee: string, freight: string, reimbursement: string, vat: boolean, qty: number) => {
    const vatPercentage = vat ? 0.011 : 0

    if (localFee == "" || freight == "") {
        return 0
    }

    return ((parseInt(price) * parseInt(currency) * qty) + parseInt(localFee) + parseInt(freight) + parseInt(reimbursement) + (((parseInt(price) * parseInt(currency)) + parseInt(localFee) + parseInt(freight)) * vatPercentage)).toLocaleString()
}

/**
 * Calculates the total payment to vendor
 * Formula: TotalCosting - IncomeTax (2%)
 * 
 * @returns - number
 */
export const calculatePaymentToVendor = (price: string, currency: string, localFee: string, reimbursement: string, freight: string, vat: boolean, incomeTax: boolean, qty: number) => {
    const incomeTaxPercentage = incomeTax ? 0.02 : 0
    const vatPercentage = vat ? 0.011 : 0

    if (localFee == "" || freight == "") {
        return 0
    }

    return ((parseInt(price) * parseInt(currency) * qty) + parseInt(localFee) + parseInt(freight) + parseInt(reimbursement) + (((parseInt(price) * parseInt(currency) * qty) + parseInt(localFee) + parseInt(freight)) * vatPercentage) - (((parseInt(price) * parseInt(currency)) + parseInt(localFee) + parseInt(freight)) * incomeTaxPercentage)).toLocaleString()
}