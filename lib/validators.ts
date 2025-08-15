export const isRequired = (value: string, fieldName?: string) => {
    return value.trim() ? "" : `${fieldName} is required.`
}

export type ValidationResult = {
    valid: boolean,
    errors: Record<string, string>
}