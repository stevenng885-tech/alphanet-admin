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
import React from "react"

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

    const startOfDay = (d: Date) => {
        const dt = new Date(d);
        dt.setHours(0, 0, 0, 0);
        return dt.getTime();
    }
    const endOfDay = (d: Date) => {
        const dt = new Date(d);
        dt.setHours(23, 59, 59, 999);
        return dt.getTime();
    }
    const pad2 = (n: number) => String(n).padStart(2, "0");

    const safeUsers = users ?? [];

    const sevenDayUsers = React.useMemo(() => {
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const day = new Date();
            day.setDate(day.getDate() - i);
            const start = startOfDay(day);
            const end = endOfDay(day);
            const usersToDay = selectUsersByRange(safeUsers, { start, end });
            result.push({
                day: pad2(day.getDate()),
                customer: usersToDay.length,
            });
        }
        return result;
    }, [safeUsers]);
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
