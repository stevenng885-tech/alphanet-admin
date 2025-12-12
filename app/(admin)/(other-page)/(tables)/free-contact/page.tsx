import ComponentCard from '@/components/common/ComponentCard'
import FloatingContactTable from '@/components/tables/FloatingContactTable'

const Home = () => {
    return (
        <div>
            <div className="space-y-6">
                <ComponentCard title="Dữ Liệu Thả Nổi">
                    <FloatingContactTable />
                </ComponentCard>
            </div>
        </div>
    )
}

export default Home