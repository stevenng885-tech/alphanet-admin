import { FaRegCalendarCheck } from 'react-icons/fa'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PrimaryDialog from '@/components/dialog/PrimaryDialog'
import DailyReportForm from '@/components/form/DailyReportForm'

type Props = {
    docId: string
}

const DailyReportButton = ({ docId }: Props) => {
    return (
        <PrimaryDialog buttonOpen={<FaRegCalendarCheck />} isShowFooter={false}>
            <DialogHeader>
                <DialogTitle>Báo Cáo Hằng Ngày</DialogTitle>
            </DialogHeader>
            <div className='mt-3'>
                <DailyReportForm docId={docId} />
            </div>
        </PrimaryDialog>
    )
}

export default DailyReportButton
