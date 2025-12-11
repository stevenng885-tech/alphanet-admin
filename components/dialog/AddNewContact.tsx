'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaPlus } from 'react-icons/fa'
import { DialogOverlay } from '@radix-ui/react-dialog'
import NewContactForm from '../form/NewContactForm'

const AddNewContact = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='flex gap-1 items-center rounded-lg bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 p-3'>
                    <FaPlus />  Thêm Khách Hàng
                </div>
            </DialogTrigger>

            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Thêm Thông Tin Liên Hệ</DialogTitle>
                </DialogHeader>
                <DialogOverlay>
                    <NewContactForm />
                </DialogOverlay>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewContact