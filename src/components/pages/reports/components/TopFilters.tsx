"use client";
import React from "react";
import Tabs from "@/components/shared/tabs";
import { usePagination } from "@/features/base/hooks/usePagination";
import MonthPicker from "@/components/ui/month-picker";
import { DatePicker } from "@/components/ui/date-picker";
import dayjs from "dayjs";

interface Props {
  tab?: string;
  setTab?: (tab: string) => void;
  date?: string;
  setDate?: (date: string) => void;
  type?: string;
  setType?: (type: string) => void;
  tabList?: {
    tab: string;
    label: string;
  }[];
}

const TopFilters: React.FC<Props> = () => {
  const tabList = [
    {
      tab: "daily",
      label: "Daily",
    },
    {
      tab: "monthly",
      label: "Monthly",
    },
    {
      tab: "yearly",
      label: "Yearly",
    },
  ];
  const { tab, date, setDate } = usePagination();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <Tabs tabList={tabList} secondaryUI />
      <div className="flex flex-row items-center gap-2 justify-end">
        {tab === "yearly" ? (
          <MonthPicker
            date={date ? new Date(date) : new Date()}
            onChange={(value) =>
              value ? setDate(dayjs(value).format("YYYY")) : setDate("")
            }
            className="w-[150px]"
          />
        ) : tab === "monthly" ? (
          <MonthPicker
            enableMonth
            date={date ? new Date(date) : new Date()}
            onChange={(value) =>
              value ? setDate(dayjs(value).format("YYYY-MM")) : setDate("")
            }
            className="w-[180px]"
          />
        ) : (
          <DatePicker
            date={date ? new Date(date) : new Date()}
            setDate={(value) =>
              value
                ? setDate(dayjs(value).startOf("day").format("YYYY-MM-DD"))
                : setDate("")
            }
            className="w-[180px]"
            postFix
            dateFormat="DD MMM  YYYY"
          />
        )}
      </div>
    </div>
  );
};

export default TopFilters;
