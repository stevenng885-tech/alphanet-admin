"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { FaInfo } from "react-icons/fa";
import Button from '../ui/button/Button';
import { PrimaryTooltip } from '../common/PrimaryTooltip';
import EditContact from '../ui/button/EditContact';
import { TypeAssign, TypeUser } from '@/types/firebase';
import DeleteContact from '../ui/button/DeleteContact';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getUsersAsync, selectUsers } from '@/lib/redux/features/firebase/firebaseSlice';
import { orderBy } from '@/utils/shared/array';


const SecondTable = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);

    const getTime = (timeStamp: number) => {
        const time = new Date(timeStamp)
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

    React.useEffect(() => {
        dispatch(getUsersAsync())
    }, [])

    return (
        <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]" >

            <div className="max-w-full overflow-x-auto" >
                <div className="min-w-[1102px]" >
                    <Table>
                        <TableHeader className="border-b border-gray-400 dark:border-white/[0.05]" >
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
                        <TableBody className="divide-y divide-gray-400 dark:divide-white/[0.05]">
                            {users.length > 0 && orderBy(users, 'des', "createdAt").map((order: TypeUser) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.createdAt)}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start" >
                                        <div className="flex items-center gap-3" >
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >
                                                {order.name}
                                            </span>
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
                                        {getTime(order.lasteUpadteAt)}
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
                                        <EditContact docId={order.id} />
                                        <PrimaryTooltip content="Xóa Liên Hệ">
                                            <DeleteContact docId={order.id} />
                                        </PrimaryTooltip>
                                        <PrimaryTooltip content="Chi Tiết">
                                            <Button variant='outline' size='sm'>
                                                <FaInfo />
                                            </Button>
                                        </PrimaryTooltip>
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