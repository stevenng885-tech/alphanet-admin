import { TypeUser } from "./firebase"

export type UpdateData = Partial<TypeUser> & Record<string, unknown>

export type TypeAddNewUserFormData = {
    name: string
    phone: string
    email: string
    source: string
    note: string
    isFloating?: boolean
    assignId?: string
    status: string
    uid: string
}
export type TypeEdiUserFormData = TypeAddNewUserFormData & {

    labels: Array<string>
}

export type TypeAddNewUserData = TypeAddNewUserFormData & {
    assign: Array<{
        assignAt: number,
        employeeName: string
        uid: string
    }>
}