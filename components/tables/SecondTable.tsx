"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { FaUser } from "react-icons/fa";
import { firebaseFireStore } from "@/utils/shared/firebase";
import { MdDelete, MdModeEdit } from 'react-icons/md';
import Button from '../ui/button/Button';

type TypeAssign = Array<{
    assignAt: Timestamp,
    employeeName: string
}>

type TypeOrder = {
    id: string,
    createdAt: Timestamp,
    name: string
    phone: string
    email: string
    source: string
    label: Array<string>
    assign: TypeAssign
    lasteUpadteAt: Timestamp
    status: string
}

const SecondTable = () => {

    const [usersContact, setUserContact] = React.useState<Array<TypeOrder>>([])

    React.useEffect(() => {
        (async () => {
            try {
                const contactRef = collection(firebaseFireStore, "users")
                const queryContact = query(contactRef, orderBy("createdAt", "desc"))
                const querySnapshot = await getDocs(queryContact)
                if (!querySnapshot.empty) {
                    const contacts = querySnapshot.docs.map((doc) => {
                        return {
                            ...doc.data() as TypeOrder,
                            id: doc.id
                        }
                    });
                    console.log(contacts)
                    setUserContact(contacts)
                } else {
                    console.log([])
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const getTime = (timeStamp: number) => {
        const time = new Date(timeStamp * 1000)
        const minusTen = (number: number) => number < 10 ? `0${number}` : number
        return (
            <div className='flex flex-col gap-1'>
                <p>{minusTen(time.getHours())}:{minusTen(time.getMinutes() + 1)}:{minusTen(time.getSeconds())}</p>
                <p>{minusTen(time.getDate())}-{minusTen(time.getMonth() + 1)}-{minusTen(time.getFullYear())}</p>
            </div>
        )
    }

    const Employee = ({ assign }: { assign: TypeAssign }) => {
        const currentEmployee = assign[assign.length - 1]
        return (
            <React.Fragment>
                <p>{currentEmployee.employeeName}</p>
            </React.Fragment>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]" >
            <div className="max-w-full overflow-x-auto" >
                <div className="min-w-[1102px]" >
                    <Table>
                        {/* Table Header */}
                        < TableHeader className="border-b border-gray-100 dark:border-white/[0.05]" >
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Ngày Nhập
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tên
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Số Điện Thoại
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Email
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Người Chăm Sóc
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Cập Nhật Lần cuối
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Nhãn
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Trạng Thái
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Nguồn Khách
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tùy chọn
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]" >
                            {usersContact && usersContact.map((order: TypeOrder) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.createdAt.seconds)}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start" >
                                        <div className="flex items-center gap-3" >
                                            < div >
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >
                                                    {order.name}
                                                </span>
                                                < span className="block text-gray-500 text-theme-xs dark:text-gray-400" >
                                                    {order.source}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.phone}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.email}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        <Employee assign={order.assign} />
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.lasteUpadteAt.seconds)}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        <></>
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.status}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.source}
                                    </TableCell>
                                    < TableCell className="flex gap-1 px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        <Button variant='outline' size='sm'>
                                            <MdModeEdit />
                                        </Button>
                                        <Button variant='outline' size='sm'>
                                            <MdDelete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default SecondTable