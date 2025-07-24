export function PortFormValidation(data: FormData) {
    let [ newErrors, valid ] = [{
        portName: "",
        country: ""
    }, true]


    if (data.get("portName") == "") {
        newErrors.portName = "This field can't be empty."
        valid = false
    }

    if (data.get("country") == "") {
        newErrors.country = "This field can't be empty."
        valid = false
    }

    return [ newErrors, valid ]
}

export function VesselFormValidation(data: FormData) {
    let [ newErrors, valid ] = [{
        vesselName: "",
        voyage: "",
        etd: "",
        cutOffDate: ""
    }, true]

    if (data.get("vesselName") == "") {
        newErrors.vesselName = "This field can't be empty."
        valid = false
    }

    if (data.get("voyage") == "") {
        newErrors.voyage = "This field can't be empty."
        valid = false
    }

    if (data.get("etd") == "") {
        newErrors.etd = "This field can't be empty."
        valid = false
    }

    if (data.get("cutOffDate") == "") {
        newErrors.cutOffDate = "This field can't be empty."
        valid = false
    }

    return [ newErrors, valid ]
}