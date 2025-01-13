import { RaRecord } from "react-admin";

export interface Log extends RaRecord {
    id: number
    task: number;
    log: string;
    date: Date;
}

export interface Task extends RaRecord {
    id: number
    name: string;
    description?: string;
    date: Date;
    tenant: number;
}

export interface Component extends RaRecord {
    id: number
    name: string;
    description: string;
    date?: Date;
}

export interface Stack extends RaRecord {
    id: number
    name: string;
    description: string;
    date?: Date;
}

export interface Tenant extends RaRecord {
    id: number
    name: string,
    description: string,
    componentsIds: number[],
    date?: Date;
    lock: boolean;
    lockBy?: number;
}