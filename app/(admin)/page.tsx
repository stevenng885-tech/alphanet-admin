import { ChartLine } from '@/components/chart/ChartLine'
import { ChartPieSeparatorNone } from '@/components/chart/ChartPieSeparatorNone'
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics'
import React from 'react'

const Home = () => {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <EcommerceMetrics />

                <ChartLine />
            </div>

            <div className="col-span-12 xl:col-span-5">
                <ChartPieSeparatorNone />
            </div>

            <div className="col-span-12">
            </div>

            <div className="col-span-12 xl:col-span-5">
            </div>

            <div className="col-span-12 xl:col-span-7">
            </div>
        </div>
    )
}

export default Home