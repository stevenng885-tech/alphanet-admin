"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useUsers } from "@/hooks/useUsers"
import { selectUsersByRange } from "@/utils/shared/array"

export const description = "A line chart"


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLine() {
    const { users } = useUsers()

    const time = new Date().getTime()
    const oneDayMilisecond = (60 * 60 * 24) * 1000
    const excessTime = time % oneDayMilisecond
    const ranges = Array(6).fill(oneDayMilisecond).concat(excessTime)
    const subtractDays = (date: Date, days: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() - days);
        return d;
    };

    const getTime = (timeStamp: number) => {
        const time = new Date(timeStamp)
        const minusTen = (number: number) => number < 10 ? `0${number}` : number
        return `${minusTen(time.getDate())}`
    }

    const sevenDayUsers = ranges.map((range, index) => {
        const days = ranges.length - (index)
        const usersToDay = selectUsersByRange(users, {
            start: time - (range * days),
            end: days == 1 ? time : time - (range * days + 1)
        })
        const today = subtractDays(new Date, days - 1)

        return {
            day: getTime(today.getTime()),
            customer: usersToDay.length
        }
    })
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <CardHeader>
                <CardTitle>Số Lượng Khách Mới Mỗi Ngày</CardTitle>
                <CardDescription>Lượng Khách Mới Trong 7 Ngày Gần Nhất</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={sevenDayUsers}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="customer"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </div>
    )
}
