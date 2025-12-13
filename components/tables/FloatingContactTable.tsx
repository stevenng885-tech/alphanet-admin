"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useUsers } from "@/hooks/useUsers";
import { getUserByDocId } from "@/lib/redux/features/firebase/firebaseAPI";
import { TypeUser } from "@/types/firebase";
import { timeStamp } from "@/utils/shared/common";
import React from "react";
import { FaDownload } from "react-icons/fa6";
import { toast } from "react-toastify";
import { PrimaryTooltip } from "../common/PrimaryTooltip";
import Button from "../ui/button/Button";
import DetailContact from "../ui/button/DetailContact";

const FloatingContactTable = () => {
    const { floatingUser, updateUserByDocId } = useUsers()
    const { isAdmin, userName, userId } = useCurrentUser()

    const handleHintPhone = (phone: string) => {
        if (!phone) return "";

        const visibleLength = 3;
        const maskedLength = Math.max(phone.length - visibleLength, 0);

        return "*".repeat(maskedLength) + phone.slice(-visibleLength);
    };

    const handleGetContact = async (docId: string) => {
        try {
            const user = await getUserByDocId(docId) as TypeUser
            const metadata = {
                isFloating: false,
                assign: [
                    ...user.assign,
                    {
                        assignAt: timeStamp(),
                        employeeName: userName as string,
                        uid: userId as string
                    }
                ]
            }
            updateUserByDocId({
                docId: docId, data: metadata
            })
            toast.success("Thành Công")
        } catch (error) {
            console.log(error);
            toast.info("Lỗi, Vui Lòng Liên Hệ Dev !!")
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3" >
            <div className="max-w-full overflow-x-auto" >
                <div className="min-w-[1102px]" >
                    <Table>
                        {/* Table Header */}
                        < TableHeader className="border-b border-gray-100 dark:border-white/5" >
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Số Điện Thọai
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Người Thực Hiện
                                </TableCell>
                                < TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Tùy Chọn
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/5" >
                            {floatingUser && floatingUser.map((order: TypeUser) => (
                                <TableRow key={order.id} >
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >
                                        {handleHintPhone(order.phone)}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start" >
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90" >
                                            {order.assign[order.assign.length - 1].employeeName}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start flex gap-2" >
                                        <PrimaryTooltip content="Lấy">
                                            <Button className="" size="sm" variant="outline" onClick={() => handleGetContact(order.id)}>
                                                <FaDownload />
                                            </Button>
                                        </PrimaryTooltip>
                                        {
                                            isAdmin &&
                                            <>
                                                {/* <PrimaryTooltip content="Chỉ Định Nhân Viên">
                                                    <Button className="" size="sm" variant="outline">
                                                        <FaUserEdit />
                                                    </Button>
                                                </PrimaryTooltip> */}
                                                <PrimaryTooltip content="Chi Tiết">
                                                    <div>
                                                        <DetailContact docId={order.id} />
                                                    </div>
                                                </PrimaryTooltip>
                                            </>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default FloatingContactTable