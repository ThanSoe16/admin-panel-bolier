'use client';
import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { IncomeBarChart } from './IncomeBarChart';
import { CurrencyFormat } from '@/utils/currencyFormat';
import { DashboardData } from '@/features/dashboard/types';
import { formatYear } from '@/utils/dateTime';
import { cn } from '@/lib/utils';

interface IncomeReportProps {
  data: DashboardData;
}

const IncomeReport: React.FC<IncomeReportProps> = ({ data }) => {
  return (
    <div className="flex flex-col justify-between border-stroke-secondary border-2 bg-brand-secondary rounded-2xl p-4 lg:p-6">
      <div className="w-full flex flex-row  items-center justify-between ">
        <p className="font-bold"> Income Report </p>
        <Link href="/reports/income">
          <div className="flex flex-row items-center gap-2 text-brand ">
            <p> Details </p>
            <ChevronRight />
          </div>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 justify-between md:items-end">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-default-secondary"> Total Incomes </p>
          <p className="text-brand font-bold"> $ {CurrencyFormat(data?.totalIncome ?? 0)} </p>
          <div className="flex flex-row gap-2">
            <div
              className={cn(
                'rounded-2xl px-2 py-1 text-white text-sm font-bold flex flex-row items-center',
                data?.trend === 'up' ? 'bg-success' : 'bg-error',
              )}
            >
              {data?.trend === 'up' ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              {data?.percentage}%
            </div>
            <p className="flex">
              {' '}
              Compared to {formatYear(dayjs().subtract(1, 'month').toISOString())}{' '}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <IncomeBarChart data={data?.barchart} />
        </div>
      </div>
    </div>
  );
};

export default IncomeReport;
