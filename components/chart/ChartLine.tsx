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

    const sevenDayUsers = React.useMemo(() => {
        const safeUsers = users ?? [];
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
    }, [users]);
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
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
