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
import PrimaryDialog from "./PrimaryDialog"

const AddNewContact = () => {
    return (

        <PrimaryDialog
            buttonOpen={
                <>
                    <FaPlus />  Thêm Khách Hàng
                </>
            }
            isShowFooter={false}
        >
            <DialogHeader>
                <DialogTitle>Thêm Thông Tin Liên Hệ</DialogTitle>
            </DialogHeader>
            <div className="mt-5">
                <NewContactForm />
            </div>
        </PrimaryDialog>

    )
}

export default AddNewContact