"use client"

import { Pie, PieChart } from "recharts"

import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useUsers } from "@/hooks/useUsers"
import { useAdmin } from "@/hooks/useAdmin"

export const description = "A pie chart with no separator"

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const colors = [
    "#880000",
    "#FFFF66",
    "#CCFFFF",
    "#33FFCC",
    "#66FF00",
    "#FFCCFF",
    "#999966",
    "#FF3399",
    "#0033FF",
    "#FFFFFF",
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ChartPieSeparatorNone() {
    const { users } = useUsers()

    const { clerkUsers } = useAdmin()

    const chartData = clerkUsers.map((user, index) => {
        const uid = user.id
        const usersIn = users.filter((item) => {
            return item.assign[item.assign.length - 1].uid === uid
        })
        return {
            name: user.username,
            count: usersIn.length,
            fill: colors[index]
        }
    })
    return (
        <div className="border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <CardHeader className="items-center pb-0">
                <CardTitle>Số Lượng Khách Hàng / Nhân Viên</CardTitle>
                <CardDescription>
                    {clerkUsers.map((user, index) => {
                        return (
                            <div key={user.id} className="flex gap-1 items-center">
                                <div className={`w-4 h-4 `} style={{ backgroundColor: colors[index] }}></div>
                                {user.username}
                            </div>
                        )
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="name"
                            stroke="0"
                            label
                        />

                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">

                <div className="text-muted-foreground leading-none">
                    Số Lượng Khách Hàng Mà Mỗi Nhân Viên Đang Chăm Sóc
                </div>
            </CardFooter>
        </div>
    )
}
