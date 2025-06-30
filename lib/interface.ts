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

export enum UserRole {
    KARYAWAN = "KARYAWAN",
    ADMIN = "ADMIN"
}