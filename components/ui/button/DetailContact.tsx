import {
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import EditContactForm from '@/components/form/EditContactForm'
import PrimaryDialog from '@/components/dialog/PrimaryDialog'
import { FaInfo } from 'react-icons/fa'
type Props = {
    docId: string
}

const DetailContact = ({ docId }: Props) => {
    return (
        <PrimaryDialog
            buttonOpen={<FaInfo />}
            isShowFooter={false}
        >
            <DialogHeader>
                <DialogTitle>Chi Tiết</DialogTitle>
            </DialogHeader>
            <EditContactForm isDisable={true} docId={docId} />
        </PrimaryDialog>

    )
}

export default DetailContact