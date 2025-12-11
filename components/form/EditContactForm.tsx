"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '@/components/ui/button/Button';
import { IoIosWarning } from "react-icons/io";
import React from 'react';
import { firebaseFireStore } from '@/utils/shared/firebase';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import TextArea from "./input/TextArea";
import { TypeUser } from "@/types/firebase";
import { updateUsersAsync } from "@/lib/redux/features/firebase/firebaseSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getUsersByDocId } from "@/lib/redux/features/firebase/firebaseAPI";
import { TypeAddNewUserData, TypeAddNewUserFormData, UpdateData } from "@/types/form";

const rules = {
    name: {
        required: "Vui lòng Nhập Tên !!",
        minLength: { value: 2, message: "Tên Ít nhất phải có 2 ký tự" },
        validate: (v: string) =>
            !/^\d+$/.test(v.trim()) || "Tên không thể chỉ là số",
    },
    phone: {
        required: "Vui lòng nhập số điện thoại !!",
        // VN numbers: 0xxxxxxxxx or +84xxxxxxxxx, prefixes 3/5/7/8/9
        pattern: {
            value: /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/,
            message: "Vui lòng nhập đúng Số điện thoại !!",
        },
    },
    email: {
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            message: "email Không đúng định dạng !!",
        },
    },
    source: {
        required: "Vui lòng Nguồn Khách !!",
    }
} as const;

type Props = {
    docId: string
}
export default function EditContactForm({ docId }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TypeAddNewUserData>()
    const currentUser = useUser()
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TypeAddNewUserData> = async (data) => {
        try {
            if (!currentUser.user) return Error()
            dispatch(updateUsersAsync({ docId, data }))
            toast.success("Thành Công")
            reset(data)
        } catch (error) {
            toast.info("Lỗi, Vui Lòng Liên Hệ Dev !!")
            console.log(error)
        }
    }

    React.useEffect(() => {
        (async () => {
            try {
                const res = await getUsersByDocId(docId)
                reset(res as TypeAddNewUserData)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <ComponentCard >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div>
                        <Label>Tên</Label>
                        <Input
                            type="text"
                            error={!!(errors.name)}
                            {...register("name", rules.name)}
                        />
                        {
                            errors.name && <div className='flex justify-start items-center gap-1 text-sm text-red-500 mx-1 capitalize'>
                                <IoIosWarning /> {errors.name.message}
                            </div>
                        }
                    </div>
                    <div>
                        <Label>Số Điện Thoại</Label>
                        <Input
                            type="text"
                            error={!!(errors.phone)}
                            {...register("phone", rules.phone)}
                        />
                        {
                            errors.phone && <div className='flex justify-start items-center gap-1 text-sm text-red-500 mx-1 capitalize'>
                                <IoIosWarning /> {errors.phone.message}
                            </div>
                        }
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            error={!!(errors.email)}
                            {...register("email", rules.email)}
                        />
                        {
                            errors.email && <div className='flex justify-start items-center gap-1 text-sm text-red-500 mx-1 capitalize'>
                                <IoIosWarning /> {errors.email.message}
                            </div>
                        }
                    </div>
                    <div>
                        <Label>Nguồn Khách</Label>
                        <Input
                            type="text"
                            error={!!(errors.source)}
                            {...register("source", rules.source)}
                        />
                        {
                            errors.source && <div className='flex justify-start items-center gap-1 text-sm text-red-500 mx-1 capitalize'>
                                <IoIosWarning /> {errors.source.message}
                            </div>
                        }
                    </div>
                    <div className="space-y-6">
                        <div>
                            <Label>Ghi Chú</Label>
                            <TextArea
                                {...register("note")}
                            />
                        </div>

                    </div>
                    <div className='flex gap-3'>
                        <Button type="button" className='w-full' variant='outline'>
                            Huỷ Bỏ
                        </Button>
                        <Button className='w-full' type="submit">
                            Cập Nhật
                        </Button>
                    </div>
                </div>

            </form>
        </ComponentCard >
    );
}
