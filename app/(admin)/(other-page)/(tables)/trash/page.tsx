"use client"
import ComponentCard from '@/components/common/ComponentCard'
import TrashTable from '@/components/tables/TrashTable'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const TrashPage = () => {
    const { isAdmin } = useCurrentUser()

    if (!isAdmin) {
        return (
            <div className='space-y-6'>
                <ComponentCard title='Thùng rác' desc='Danh sách liên hệ đã xoá (có thể xoá vĩnh viễn)'>
                    <div className='text-center text-gray-500 dark:text-gray-400 py-12'>
                        Bạn không có quyền truy cập trang này
                    </div>
                </ComponentCard>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            <ComponentCard title='Thùng rác' desc='Danh sách liên hệ đã xoá (có thể xoá vĩnh viễn)'>
                <TrashTable />
            </ComponentCard>
        </div>
    )
}

export default TrashPage
