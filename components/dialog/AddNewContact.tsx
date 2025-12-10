'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Button from '../ui/button/Button'
import { FaPlus } from 'react-icons/fa'
import { DialogOverlay } from '@radix-ui/react-dialog'
import DefaultInputs from '../form/form-elements/DefaultInputs'

const AddNewContact = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex gap-1 items-center rounded-lg bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 p-3'>
                    <FaPlus />  Thêm Khách Hàng
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm Thông Tin Liên Hệ</DialogTitle>
                </DialogHeader>
                <DialogOverlay>
                    <DefaultInputs />
                </DialogOverlay>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewContact