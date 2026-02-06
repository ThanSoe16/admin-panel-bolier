'use client';
import React from 'react';
import { PopularPieChart } from './PieChart';
import { Dot } from 'lucide-react';
import { pieChartColors } from './data';
import { PopularCategoryData } from '@/features/dashboard/types';

interface PopularCategoryProps {
  data: PopularCategoryData[];
}

const PopularCategory: React.FC<PopularCategoryProps> = ({ data }) => {
  const chartData =
    data?.map((item) => ({
      templateName: item.categoryName,
      totalBlog: item.count,
    })) ?? [];

  const topCategories = chartData.slice(0, 4);
  const otherCategories = chartData.slice(4);
  const otherCount = otherCategories.reduce((sum, item) => sum + item.totalBlog, 0);

  const displayData = [
    ...topCategories,
    ...(otherCount > 0 ? [{ templateName: 'Others', totalBlog: otherCount }] : []),
  ];

  return (
    <div className="rounded-2xl p-4 lg:p-6 flex flex-col md:flex-row justify-start items-center border mt-4">
      <div className="w-1/2 md:w-1/4">
        <PopularPieChart data={displayData} />
      </div>

      <div className="flex-1">
        <p className="font-bold mb-2">Popular Categories</p>
        {displayData.map((item, index) => (
          <div key={index} className="flex flex-row gap-2 w-full">
            <Dot size={40} style={{ color: pieChartColors[index] }} className="-ml-4 -my-2" />
            <p className="text-sm text-default-secondary w-[150px] md:w-[400px] truncate">
              {item.templateName}:
            </p>
            <p className="text-sm font-bold">{item.totalBlog} Blog</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
