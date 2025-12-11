"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import Button from '@/components/ui/button/Button';
import { IoIosWarning } from "react-icons/io";
import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firebaseFireStore } from '@/utils/shared/firebase';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import { timeStamp } from '@/utils/shared/common';
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./input/InputField";
import TextArea from "./input/TextArea";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addUsersAsync } from "@/lib/redux/features/firebase/firebaseSlice";
import { TypeAddNewUserData, TypeAddNewUserFormData } from "@/types/form";

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

export default function NewContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<TypeAddNewUserFormData>()
    const currentUser = useUser()


    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<TypeAddNewUserFormData> = async (data) => {
        try {
            if (!currentUser.user) return Error()
            const metadata: TypeAddNewUserData = {
                ...data,
                assign: [
                    {
                        assignAt: timeStamp(),
                        employeeName: currentUser.user.username as string,
                        uid: currentUser.user.id
                    }
                ],
            }
            dispatch(addUsersAsync(metadata))
            toast.success("Thành Công")
            reset()
        } catch (error) {
            toast.info("Lỗi, Vui Lòng Liên Hệ Dev !!")
            console.log(error)
        }
    }

    return (
        <ComponentCard title="Thông tin cơ bản">
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
                        <Button className='w-full' variant='outline' onClick={() => {
                            const event = new KeyboardEvent("keydown", { key: "Escape" });
                            window.dispatchEvent(event);
                        }}
                        >
                            Huỷ Bỏ
                        </Button>
                        <Button className='w-full'>
                            Thêm Mới
                        </Button>
                    </div>
                </div>

            </form>
        </ComponentCard >
    );
}
