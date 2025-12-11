import PrimaryDialog from '@/components/dialog/PrimaryDialog';
import {
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { updateUsersAsync } from '@/lib/redux/features/firebase/firebaseSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
type Props = {
    docId: string
}
const DeleteContact = ({ docId }: Props) => {

    const dispatch = useAppDispatch();

    const handleDeleteContact = async () => {
        try {

            dispatch(updateUsersAsync({ docId: docId, data: { isDelete: true } }))
            toast.success("Thành Công")
        } catch (error) {
            toast.info("Lỗi, Vui Lòng Liên Hệ Dev !!")

        }
    }
    return (
        <PrimaryDialog onConfirm={handleDeleteContact} buttonOpen={<MdDelete />}>
            <DialogHeader>
                <DialogTitle>Bạn có Muốn Xóa Thông Tin Liên Hệ Này Hay Không</DialogTitle>
            </DialogHeader>
        </PrimaryDialog>

    )
}

export default DeleteContact