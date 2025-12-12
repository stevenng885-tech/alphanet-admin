"use client"
import { useUsers } from '@/hooks/useUsers';
import { TypeAssign, TypeUser } from '@/types/firebase';
import { orderBy } from '@/utils/shared/array';
import React from 'react';
import { PrimaryTooltip } from '../common/PrimaryTooltip';
import DeleteContact from '../ui/button/DeleteContact';
import DetailContact from '../ui/button/DetailContact';
import EditContact from '../ui/button/EditContact';
import PushFloatingUser from '../ui/button/PushFloatingUser';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";


const SecondTable = () => {

    const { users, } = useUsers()

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
    const converUserr = orderBy(users.map((user) => ({ ...user, assignAt: user.assign[user.assign.length - 1].assignAt })), "des", "assignAt")

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
                            {converUserr.length > 0 && converUserr.map((order: TypeUser) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.assign[order.assign.length - 1].assignAt)}
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
                                        <Employee assign={order.assign} />
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.lasteUpadteAt)}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.status}
                                    </TableCell>
                                    < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {order.source}
                                    </TableCell>
                                    < TableCell className="flex gap-1 px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >

                                        <PrimaryTooltip content="Chỉnh Sửa">
                                            <div>
                                                <EditContact docId={order.id} />
                                            </div>
                                        </PrimaryTooltip>
                                        <PrimaryTooltip content="Chi Tiết">
                                            <div>
                                                <DetailContact docId={order.id} />
                                            </div>
                                        </PrimaryTooltip>
                                        <PrimaryTooltip content="Xóa Liên Hệ">
                                            <div>
                                                <DeleteContact docId={order.id} />
                                            </div>
                                        </PrimaryTooltip>
                                        <PrimaryTooltip content="Thả Trôi Liên Hệ Này">
                                            <div>
                                                <PushFloatingUser docId={order.id} />
                                            </div>
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