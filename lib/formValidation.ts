import { isRequired, ValidationResult } from "./validators"

/**
 * Used to validate port location form
 * for creation and update. 
 * 
 * @param data
 * @returns 
 */
export function validatePortForm(data: FormData): ValidationResult {
    const errors: Record<string, string> = {}

    const portNameError = isRequired(data.get("portName") as string, "Port Name") || isRequired(data.get("portName") as string)
    if (portNameError) errors.portName = portNameError

    const countryError = isRequired(data.get("country") as string, "Country") || isRequired(data.get("country") as string)
    if (countryError) errors.country = countryError

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}

/**
 * Used to validate vessel form
 * for creation and update.
 * 
 * @param data 
 * @returns 
 */
export function validateVesselForm(data: FormData): ValidationResult {
    const errors: Record<string, string> = {}

    const vesselNameError = isRequired(data.get("vesselName") as string, "Vessel Name") || isRequired(data.get("vesselName") as string)
    if (vesselNameError) errors.vesselName = vesselNameError

    const voyageError = isRequired(data.get("voyage") as string, "Voyage") || isRequired(data.get("voyage") as string)
    if (voyageError) errors.voyage = voyageError

    return {
        valid: Object.keys(errors).length === 0,
        errors
    }
}