import PrimaryDialog from '@/components/dialog/PrimaryDialog'
import React from 'react'
import { DialogHeader } from '../dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { FaInfo } from 'react-icons/fa'
type Props = {
    docId: string
}
const ContactDetail = ({ docId }: Props) => {
    return (
        <PrimaryDialog
            buttonOpen={<FaInfo />}
            isShowFooter={false}
        >
            <DialogHeader>
                <DialogTitle>Chi Tiết</DialogTitle>
            </DialogHeader>
        </PrimaryDialog>

    )
}

export default ContactDetail