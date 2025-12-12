import {
    Dialog,
    DialogClose,
    DialogContent
} from "@/components/ui/dialog";
import React from 'react';
import { IoMdClose } from "react-icons/io";
import Button from '../ui/button/Button';

type Props = {
    buttonOpen: string | React.ReactNode
    onClose?: () => void
    onConfirm?: () => void
    onOpen?: () => void
    closeOnConfirm?: boolean,
    children: React.ReactNode
    isShowFooter?: boolean
}

const PrimaryDialog = ({ buttonOpen, children, onClose, onConfirm, onOpen, closeOnConfirm = true, isShowFooter = true }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const handleClose = () => {
        if (onClose) {
            onClose()
        }

        setIsOpen(false)
    }

    const handleOpen = () => {
        if (onOpen) {
            onOpen()
        }
        setIsOpen(true)
    }
    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm()
        }
        if (closeOnConfirm) {
            setIsOpen(false)
        }
    }
    return (
        <Dialog open={isOpen} >
            <Button variant='outline' size='sm' onClick={handleOpen}>
                {buttonOpen}
            </Button>
            <DialogContent
                showCloseButton={false}
                onEscapeKeyDown={handleClose}
                onPointerDownOutside={handleClose}
                onInteractOutside={handleClose}
                className='max-h-[80vh] overflow-y-scroll hidden-scroll-bar'
            >
                <DialogClose className='flex justify-end'>
                    <IoMdClose onClick={handleClose} />
                </DialogClose>
                <div >
                    {children}
                </div>
                {isShowFooter &&
                    <div className='flex gap-2'>
                        <Button
                            className='w-full'
                            variant='outline'
                            onClick={handleClose}
                        >
                            Huỷ Bỏ
                        </Button>
                        <Button className='w-full' onClick={handleConfirm}>
                            Xác Nhận
                        </Button>
                    </div>
                }

            </DialogContent>
        </Dialog>
    )
}

export default PrimaryDialog