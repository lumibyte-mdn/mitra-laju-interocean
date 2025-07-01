export interface Users {
    id: number;
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    role: string;
}

export interface Costing {
    id: number;
    vendorName: string;
    price: number;
    currency: number;
    localFee: number;
    freight: number;
    subCosting: number;
    reimbursement: number;
    vat: boolean;
    incomeTax: boolean;
    freightPaymentDate: string;
}

export interface Shipment {
    id: number;
    orderNumber: string;
    customer: string;
    shipper: string;
    dueDate: string;
    customerCode: string;
    qty: number;
    size: string;
    origin: string;
    destination: string;
    shipmentType: string;
    estimatedDate: string;
    containerNumber: string;
    bookingNumber: string;
}

export enum UserRole {
    KARYAWAN = "KARYAWAN",
    ADMIN = "ADMIN"
}