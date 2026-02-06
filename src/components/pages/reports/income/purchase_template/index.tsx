'use client';
import React from 'react';
import dayjs from 'dayjs';
import PageTitle from '@/components/shared/PageTitle';
import { usePagination } from '@/features/base/hooks/usePagination';
import { DataTable } from '@/components/shared/data-table';
import {
  purchaseTemplateCategoryColumnDefs,
  purchaseTemplateDailyColumnDefs,
  purchaseTemplateMonthlyColumnDefs,
  purchaseTemplateYearlyColumnDefs,
} from './components/columnDefs';
import SearchInput from '@/components/shared/search-input';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useGetTemplateIncomeReport } from '@/features/report/income/purchase-templates/services/queries';
import { useGetCategories } from '@/features/settings/category/services/queries';

const IncomeReportPurchaseTemplate = () => {
  const { rowPerPage, pageIndex, tab, date, word, mode, setMode } = usePagination();

  const { data, isLoading } = useGetTemplateIncomeReport({
    date:
      tab === 'monthly'
        ? dayjs(date).format('YYYY-MM')
        : tab === 'yearly'
          ? dayjs(date).format('YYYY')
          : date,
    type: tab,
    pageIndex,
    rowPerPage,
    word,
    category: mode === 'all' ? '' : mode,
  });
  const categories = useGetCategories({});

  const links = [
    {
      label: 'Income Report',
      href: '/reports/income',
    },
    {
      label: tab.charAt(0).toUpperCase() + tab.slice(1),
      href: `/reports/income?tab=${tab}`,
    },
    {
      label: 'Purchase Template',
      href: '',
    },
  ];

  const currentDataTable = React.useMemo(() => {
    switch (tab) {
      case 'monthly':
        return {
          data: data?.body?.data?.purchasedTemplatesList ?? [],
          columns: purchaseTemplateMonthlyColumnDefs,
        };
      case 'yearly':
        return {
          data: data?.body?.data?.purchasedTemplatesList ?? [],
          columns: purchaseTemplateYearlyColumnDefs,
        };
      default:
        return {
          data: data?.body?.data?.purchasedTemplatesList ?? [],
          columns: purchaseTemplateDailyColumnDefs,
        };
    }
  }, [tab, data]);

  return (
    <div className="flex flex-col w-full gap-4">
      <PageBreadcrumb links={links} enableBack />

      <div className="text-brand normal-text font-semibold mt-2">
        Report {tab === 'yearly' ? 'Year' : tab === 'monthly' ? 'Month' : 'Date'} -{' '}
        {dayjs(date).format(
          tab === 'yearly' ? 'YYYY' : tab === 'monthly' ? 'MMM YYYY' : 'DD MMM YYYY',
        )}
      </div>
      <DataTable
        data={data?.body?.data?.templateSales ?? []}
        columns={purchaseTemplateCategoryColumnDefs}
        isShowNo={false}
      />
      <div className="mt-4 table-container">
        <DataTable
          isShowNo={false}
          isLoading={isLoading}
          data={currentDataTable?.data}
          columns={currentDataTable?.columns}
          query={{
            rowPerPage,
            pageIndex,
          }}
          total={data?.body?.total}
          renderHeader={() => (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              {tab === 'yearly' ? (
                <PageTitle className="text-2xl font-semibold flex-1">Purchased Templates</PageTitle>
              ) : (
                <PageTitle className="text-2xl font-semibold mb-0 flex-1">
                  Buy Templates List
                </PageTitle>
              )}

              {tab === 'daily' && (
                <div className="flex flex-col md:flex-row gap-3">
                  <SearchInput
                    placeholder="Search by template name or ID"
                    className="w-full md:w-[300px]"
                  />
                  <Select defaultValue="all" onValueChange={(value) => setMode(value)}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.data?.body?.data?.map((data) => (
                        <SelectItem key={data?.id} value={data?.id}>
                          {data?.engName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default IncomeReportPurchaseTemplate;
