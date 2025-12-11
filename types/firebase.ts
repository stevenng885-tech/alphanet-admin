import { Timestamp } from "firebase/firestore"

export type TypeTimestamp = number

export type TypeAssign = Array<{
    assignAt: TypeTimestamp,
    employeeName: string
    uid: string
}>


export type TypeUser = {
    id: string,
    createdAt: TypeTimestamp,
    name: string
    phone: string
    email: string
    source: string
    label: Array<string>
    assign: TypeAssign
    lasteUpadteAt: TypeTimestamp
    status: string
    note: string
}
