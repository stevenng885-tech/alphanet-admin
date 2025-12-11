import { MdModeEdit } from 'react-icons/md'
import {
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import EditContactForm from '@/components/form/EditContactForm'
import PrimaryDialog from '@/components/dialog/PrimaryDialog'
type Props = {
    docId: string
}
const EditContact = ({ docId }: Props) => {
    return (
        <PrimaryDialog
            buttonOpen={<MdModeEdit />}
            isShowFooter={false}
        >
            <DialogHeader>
                <DialogTitle>Chỉnh sửa</DialogTitle>
            </DialogHeader>
            <EditContactForm docId={docId} />
        </PrimaryDialog>

    )
}

export default EditContact