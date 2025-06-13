export interface Users {
    id: number;
    clerkId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    role: string;
}

export enum UserRole {
    KARYAWAN = "KARYAWAN",
    ADMIN = "ADMIN"
}