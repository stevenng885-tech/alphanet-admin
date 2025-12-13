"use client"
import { useAdmin } from '@/hooks/useAdmin';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUsers } from '@/hooks/useUsers';
import { TypeAssign, TypeUser } from '@/types/firebase';
import { orderBy } from '@/utils/shared/array';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FaAngleDown, FaEye, FaFilter, FaPhone } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { PrimaryTooltip } from '../common/PrimaryTooltip';
import Select from '../form/Select';
import MultiSelect from '../form/MultiSelect';
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
import { LuEyeClosed } from "react-icons/lu";
import { IoIosCopy } from 'react-icons/io';
import Input from '../form/input/InputField';

type TypeFormData = {
    uid?: string
}

const SecondTable = () => {

    const { users } = useUsers()
    const { isAdmin } = useCurrentUser()
    const { allSales } = useAdmin()
    const { register, control, reset } = useForm<TypeFormData>()
    const watchedUid = useWatch({ control, name: 'uid', defaultValue: "" })
    const [appliedUid, setAppliedUid] = React.useState<string | undefined>(undefined)
    const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = React.useState<Date | undefined>(undefined)
    const [appliedRange, setAppliedRange] = React.useState<{ start?: number; end?: number }>({})
    const [hiddenPhones, setHiddenPhones] = React.useState<Record<string, boolean>>({})
    const [searchText, setSearchText] = React.useState<string>("")
    const [debouncedSearch, setDebouncedSearch] = React.useState<string>("")
    const [selectedLabels, setSelectedLabels] = React.useState<string[]>([])
    const [appliedLabels, setAppliedLabels] = React.useState<string[]>([])
    const selectedLabelsNormalized = React.useMemo(() => selectedLabels.map(s => String(s ?? "").trim().toLowerCase()), [selectedLabels])
    const appliedLabelsNormalized = React.useMemo(() => appliedLabels.map(s => String(s ?? "").trim().toLowerCase()), [appliedLabels])
    const labelsChanged = selectedLabelsNormalized.join(",") !== appliedLabelsNormalized.join(",")

    type UserWithLastAssign = TypeUser & (TypeAssign extends Array<infer U> ? U : never)

    const [now, setNow] = React.useState<number>(() => Date.now())
    React.useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 60 * 1000)
        return () => clearInterval(t)
    }, [])

    const getTime = (timeStamp?: number, highlight = false) => {
        if (!timeStamp) return <div className='flex flex-col gap-1 text-gray-400'>(Không có)</div>

        const time = new Date(timeStamp)
        const pad2 = (n: number) => String(n).padStart(2, "0")

        const n = now
        const diffMs = Math.max(0, n - timeStamp)
        const seconds = Math.floor(diffMs / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        let ago = ""
        if (seconds < 60) {
            ago = `Vài giây trước`
        } else if (minutes < 60) {
            ago = `${minutes} phút trước`
        } else if (hours < 24) {
            const remMinutes = minutes - hours * 60
            ago = `${hours} giờ${remMinutes > 0 ? ` ${remMinutes} phút` : ""} trước`
        } else {
            const daysOnly = days
            const remHours = hours - daysOnly * 24
            ago = `${daysOnly} ngày${remHours > 0 ? ` ${remHours} giờ` : ""} trước`
        }

        const timeText = `${pad2(time.getHours())}:${pad2(time.getMinutes())}:${pad2(time.getSeconds())}`
        const dateText = `${pad2(time.getDate())}/${pad2(time.getMonth() + 1)}/${String(time.getFullYear()).slice(-2)}`

        const timeMutedClass = "text-xs text-gray-500 dark:text-gray-400"
        let agoClass = "text-xs text-gray-500 dark:text-gray-400"
        if (highlight) {
            if (minutes < 60) {
                agoClass = "text-sm font-semibold text-green-600 dark:text-green-400"
            } else if (hours < 24) {
                agoClass = "text-sm font-semibold text-brand-500 dark:text-brand-400"
            } else {
                agoClass = "text-sm font-semibold text-gray-900 dark:text-white/90"
            }
        }

        return (
            <div className='flex flex-col gap-0.5' title={time.toLocaleString()}>
                {highlight ? (
                    <div className={agoClass}>{ago}</div>
                ) : (
                    <div className={timeMutedClass}>{timeText} <span className='mx-1'>—</span> {dateText}</div>
                )}
                <div className={highlight ? timeMutedClass : "text-xs text-gray-400 dark:text-gray-500"}>
                    {!highlight ? ago : `${timeText} — ${dateText}`}
                </div>
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

    const maskPhone = (p?: string) => {
        if (!p) return ""
        const s = String(p)
        const last3 = s.slice(-3)
        const masked = "*".repeat(Math.max(0, s.length - 3)) + last3
        return masked
    }

    const toggleHiddenPhone = (id: string) => {
        setHiddenPhones((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const copyToClipboard = async (text?: string) => {
        if (!text) return
        try {
            await navigator.clipboard.writeText(text)
        } catch (e) {
            console.error(e)
        }
    }

    const callPhone = (number?: string) => {
        if (!number) return
        try {
            window.open(`tel:${number}`)
        } catch (e) {
            console.error(e)
        }
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
        if (debouncedSearch && debouncedSearch.trim().length > 0) {
            const s = debouncedSearch.trim().toLowerCase()
            newArr = newArr.filter((user) => {
                const uid = String(user.uid ?? "").toLowerCase()
                const name = String(user.name ?? "").toLowerCase()
                const phone = String(user.phone ?? "").toLowerCase()
                const status = String(user.status ?? "").toLowerCase()
                const source = String(user.source ?? "").toLowerCase()
                return (
                    uid.includes(s) ||
                    name.includes(s) ||
                    phone.includes(s) ||
                    status.includes(s) ||
                    source.includes(s)
                )
            })
        }
        if (appliedLabels && appliedLabels.length > 0) {
            const normalizedApplied = appliedLabels.map(a => String(a ?? "").trim().toLowerCase()).filter(Boolean)
            newArr = newArr.filter((user) => {
                const labels = (user.labels ?? []).map(l => String(l ?? "").trim().toLowerCase())
                return labels.some((l) => normalizedApplied.includes(l))
            })
        }
        return newArr
    }, [users, appliedUid, appliedRange, debouncedSearch, appliedLabels])

    React.useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(searchText), 500)
        return () => clearTimeout(t)
    }, [searchText])

    React.useEffect(() => {
        if (!converUserr || converUserr.length === 0) return
        setHiddenPhones((prev) => {
            let updated = false
            const next = { ...prev }
            converUserr.forEach((u) => {
                if (next[u.id] === undefined) {
                    next[u.id] = true
                    updated = true
                }
            })
            return updated ? next : prev
        })
    }, [converUserr])

    const sales = allSales.map((sale) => ({
        label: sale.username,
        value: sale.id
    }))

    return (
        <div className="overflow-hidden rounded-xl border border-gray-400 bg-white dark:border-white/5 dark:bg-white/3" >
            <div className='p-5 flex items-center gap-3'>
                <Input
                    placeholder='UID, Tên, Số Điện Thoại,...'
                    value={searchText}
                    onChange={(e) => setSearchText(String(e.target.value))}
                />
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
                <div className="relative ">
                    <MultiSelect
                        options={React.useMemo(() => Array.from(new Set(users.flatMap(u => u.labels ?? []).map(l => String(l ?? "").trim()))).filter(Boolean).map(l => ({ value: l, text: l })), [users])}
                        placeholder='Chọn nhãn'
                        value={selectedLabels}
                        onChange={(vals) => setSelectedLabels(vals)}
                        className="min-w-[150px]"
                    />
                </div>
                <Calendar22 value={startDate} onSelect={(d) => setStartDate(d)} placeholder="Ngày bắt đầu" />
                /
                <Calendar22 value={endDate} onSelect={(d) => setEndDate(d)} placeholder="Ngày kết thúc" />
                <div className="flex items-center gap-2">
                    {((watchedUid && watchedUid !== appliedUid) ||
                        (toStartMs(startDate) !== appliedRange.start) ||
                        (toEndMs(endDate) !== appliedRange.end) ||
                        labelsChanged) && (
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
                                    setAppliedLabels(selectedLabels)
                                }}>
                                    <FaFilter />
                                </Button>
                            </PrimaryTooltip>
                        )}
                    <PrimaryTooltip content="Xóa Lọc">
                        <Button size="sm" onClick={() => { reset({ uid: "" }); setAppliedUid(undefined); setStartDate(undefined); setEndDate(undefined); setAppliedRange({}); setSelectedLabels([]); setAppliedLabels([]) }}>
                            <MdClear />
                        </Button>
                    </PrimaryTooltip>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto" >
                <div className={converUserr.length === 0 ? "min-w-full" : "min-w-[1102px]"} >
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
                                    Tình Trạng
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
                            {converUserr.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-20 text-center text-gray-500 dark:text-gray-400 font-bold text-2xl">
                                        (TRỐNG...)
                                    </TableCell>
                                </TableRow>
                            ) : (
                                converUserr.map((order: UserWithLastAssign) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                            {getTime(order.assignAt, false)}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 sm:px-6 text-start" >
                                            {order.name}
                                        </TableCell>
                                        <TableCell className="flex gap-2 px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                            <div className="flex items-center gap-3" >
                                                <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >
                                                    {hiddenPhones[order.id] ? maskPhone(order.phone) : order.phone}
                                                </span>
                                                <PrimaryTooltip content={hiddenPhones[order.id] ? "Hiện Số Điện Thoại" : "Ẩn Số Điện Thoại"}>
                                                    <Button aria-label={hiddenPhones[order.id] ? "Hiện số" : "Ẩn số"} size="sm" variant="outline" onClick={() => toggleHiddenPhone(order.id)}>
                                                        {hiddenPhones[order.id] ? <FaEye /> : <LuEyeClosed />}
                                                    </Button>
                                                </PrimaryTooltip>
                                                <PrimaryTooltip content="Sao Chép Số Điện Thoại">
                                                    <Button aria-label="Sao chép số" size="sm" variant="outline" onClick={() => copyToClipboard(order.phone)}>
                                                        <IoIosCopy />
                                                    </Button>
                                                </PrimaryTooltip>
                                                <PrimaryTooltip content="Gọi Số Điện Thoại">
                                                    <Button aria-label="Gọi số" size="sm" variant="outline" onClick={() => callPhone(order.phone)}>
                                                        <FaPhone />
                                                    </Button>
                                                </PrimaryTooltip>
                                            </div>
                                        </TableCell>
                                        < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                            <Employee assign={order.assign} />
                                        </TableCell>
                                        < TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                            {getTime(order.lasteUpadteAt, true)}
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
                            )
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default SecondTable