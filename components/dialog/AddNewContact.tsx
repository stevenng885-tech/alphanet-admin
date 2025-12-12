'use client'
import {
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { FaPlus } from 'react-icons/fa'
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