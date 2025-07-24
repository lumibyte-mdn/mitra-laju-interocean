export interface PortForm {
    portName: string;
    country: string;
}

export interface Port {
    id: string;
    portName: string;
    country: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string
}

export interface VesselForm {
    vesselName: string;
    voyage: string;
    etd: string;
    cutOffDate: string;
}

export interface Vessel {
    id: string;
    vesselName: string;
    voyage: string;
    etd: string;
    cutOffDate: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}