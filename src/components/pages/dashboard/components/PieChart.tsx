"use client"

import { Pie, PieChart, LabelList } from "recharts"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { pieChartColors } from "./data";

interface PieChartData {
  templateName: string;
  totalBlog: number;
}

interface PieChartProps {
  data: PieChartData[];
}

export function PopularPieChart(props: PieChartProps) {
  const chartData = props?.data?.map((item, index) => ({
    ...item,
    fill: pieChartColors[index] // Cycle through colors
  }))
  
  const chartConfig = props?.data?.reduce((acc, item, index) => {
    acc[item.templateName] = {
      label: item.templateName,
      color: pieChartColors[index] // Cycle through colors
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="templateName" />}
            />
            <Pie 
              data={chartData} 
              dataKey="totalBlog"
              stroke="white"
              strokeWidth={2}
            >
              <LabelList
                dataKey="totalBlog"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value) => `${value} %`}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
