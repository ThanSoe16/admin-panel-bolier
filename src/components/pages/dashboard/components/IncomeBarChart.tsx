'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChartData } from '@/features/dashboard/types';

interface IncomeBarChartProps {
  data: BarChartData;
}

const chartConfig = {
  count: {
    label: 'Count',
    color: '#275EE2',
  },
} satisfies ChartConfig;

export function IncomeBarChart({ data }: IncomeBarChartProps) {
  const chartData = [
    { month: 'Template', count: data?.templateCounts ?? 0 },
    { month: 'Hosting', count: data?.hostingCounts ?? 0 },
    { month: 'Server', count: data?.serverCounts ?? 0 },
  ];

  return (
    <Card className="bg-brand-secondary border-none shadow-none">
      <CardContent className="p-0 min-h-[160px] w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
