import PrimaryDialog from '@/components/dialog/PrimaryDialog';
import { updateUsersAsync } from '@/lib/redux/features/firebase/firebaseSlice';
import { useAppDispatch } from '@/lib/redux/hooks';
import React from 'react'
import { IoPush } from "react-icons/io5";
import { DialogHeader, DialogTitle } from '../dialog';
import { toast } from 'react-toastify';

type Props = {
    docId: string
}
const PushFloatingUser = ({ docId }: Props) => {
    const dispatch = useAppDispatch();

    const handlePushContactToFloating = async () => {
        try {
            dispatch(updateUsersAsync({
                docId, data: {
                    isFloating: true
                }
            }))
            toast.success("Thành Công")
        } catch (error) {
            toast.info("Lỗi, Vui Lòng Liên Hệ Dev !!")
        }
    }
    return (
        <PrimaryDialog onConfirm={handlePushContactToFloating} buttonOpen={<IoPush />}>
            <DialogHeader>
                <DialogTitle >Bạn có Muốn Đẩy Thông Tin Liên Hệ Này Tới Dữ Liệu Thả Nổi Hay Không</DialogTitle>
            </DialogHeader>
        </PrimaryDialog>
    )
}

export default PushFloatingUser