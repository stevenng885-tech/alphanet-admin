"use client"
import { useAdmin } from '@/hooks/useAdmin';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUsers } from '@/hooks/useUsers';
import { TypeAssign, TypeUser } from '@/types/firebase';
import { orderBy } from '@/utils/shared/array';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleDown, FaFilter } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { PrimaryTooltip } from '../common/PrimaryTooltip';
import Select from '../form/Select';
import Button from '../ui/button/Button';
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
import { Calendar22 } from '../datePicker/Calendar22';

type TypeFormData = {
    uid?: string
}

const SecondTable = () => {

    const { users } = useUsers()
    const { isAdmin } = useCurrentUser()
    const { allSales } = useAdmin()
    const { register, watch, reset } = useForm<TypeFormData>()
    const watchedUid = watch("uid", "")
    const [appliedUid, setAppliedUid] = React.useState<string | undefined>(undefined)
    const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)
    const [appliedRange, setAppliedRange] = React.useState<{ start?: number; end?: number }>({})

    type UserWithLastAssign = TypeUser & (TypeAssign extends Array<infer U> ? U : never)

    const getTime = (timeStamp: number) => {
        const time = new Date(timeStamp)
        const pad2 = (n: number) => String(n).padStart(2, "0")
        return (
            <div className='flex flex-col gap-1'>
                <p>{pad2(time.getHours())}:{pad2(time.getMinutes())}:{pad2(time.getSeconds())}</p>
                <p>{pad2(time.getDate())}/{pad2(time.getMonth() + 1)}/{String(time.getFullYear()).slice(-2)}</p>
            </div>
        )
    }

    const toStartMs = (d?: Date) => d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime() : undefined
    const toEndMs = (d?: Date) => d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime() : undefined

    const Employee = ({ assign }: { assign: TypeAssign }) => {
        const currentEmployee = assign[assign.length - 1]
        return (
            <React.Fragment>
                <p>{currentEmployee.employeeName}</p>
            </React.Fragment>
        )
    }

    const normalizeMs = (ts?: number) => {
        if (!ts) return undefined
        return ts < 1e12 ? ts * 1000 : ts
    }

    const converUserr = React.useMemo(() => {
        let newArr: UserWithLastAssign[] = []
        newArr = orderBy(users.map((user) => {
            const lastAssign = user.assign[user.assign.length - 1]
            const assignAt = normalizeMs(lastAssign?.assignAt)
            return ({ ...user, ...lastAssign, assignAt })
        }), "des", "assignAt") as UserWithLastAssign[]
        if (!!appliedUid) {
            newArr = newArr.filter((user) => user.uid == appliedUid)
        }
        if (appliedRange?.start !== undefined || appliedRange?.end !== undefined) {
            const start = appliedRange.start ?? Number.MIN_SAFE_INTEGER
            const end = appliedRange.end ?? Number.MAX_SAFE_INTEGER
            newArr = newArr.filter((user) => {
                const assignAt = normalizeMs(user.assignAt)
                if (!assignAt) return false
                if (assignAt < start) return false
                if (assignAt > end) return false
                return true
            })
        }
        return newArr
    }, [users, appliedUid, appliedRange])

    const sales = allSales.map((sale) => ({
        label: sale.username,
        value: sale.id
    }))

    return (
        <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/5 dark:bg-white/3" >
            <div className='p-5 flex items-center gap-3'>
                {
                    isAdmin &&
                    <div className="relative">
                        <Select
                            options={sales}
                            placeholder='Chọn Người Chăm Sóc'
                            className="dark:bg-dark-900 min-w-[100px]"
                            {...register("uid")}
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <FaAngleDown />
                        </span>
                    </div>
                }
                <Calendar22 value={startDate} onSelect={(d) => setStartDate(d)} placeholder="Ngày bắt đầu" />
                /
                <Calendar22 value={endDate} onSelect={(d) => setEndDate(d)} placeholder="Ngày kết thúc" />
                <div className="flex items-center gap-2">
                    {((watchedUid && watchedUid !== appliedUid) ||
                        (toStartMs(startDate) !== appliedRange.start) ||
                        (toEndMs(endDate) !== appliedRange.end)) && (
                            <PrimaryTooltip content="Áp dụng bộ lọc">
                                <Button size="sm" onClick={() => {
                                    const s = toStartMs(startDate)
                                    const e = toEndMs(endDate)
                                    let start = s
                                    let end = e
                                    if (s && e && s > e) {
                                        start = e
                                        end = s
                                    }
                                    setAppliedUid(watchedUid ? watchedUid : undefined)
                                    setAppliedRange({ start, end })
                                }}>
                                    <FaFilter />
                                </Button>
                            </PrimaryTooltip>
                        )}
                    <PrimaryTooltip content="Xóa Lọc">
                        <Button size="sm" onClick={() => { reset({ uid: "" }); setAppliedUid(undefined); setStartDate(undefined); setEndDate(undefined); setAppliedRange({}) }}>
                            <MdClear />
                        </Button>
                    </PrimaryTooltip>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto" >
                <div className="min-w-[1102px]" >
                    <Table>
                        <TableHeader className="border-b border-gray-400 dark:border-white/5" >
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
                        <TableBody className="divide-y divide-gray-400 dark:divide-white/5">
                            {converUserr.length > 0 && converUserr.map((order: UserWithLastAssign) => (
                                <TableRow key={order.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {getTime(order.assignAt)}
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