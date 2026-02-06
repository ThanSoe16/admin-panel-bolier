"use client";
import React from "react";
import dayjs from "dayjs";
import SearchInput from "@/components/shared/search-input";
import { usePagination } from "@/features/base/hooks/usePagination";
import { DatePicker } from "@/components/ui/date-picker";

const TopFilters = () => {
  const { start, setStart } = usePagination();
  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-center justify-start">
      <SearchInput placeholder="Search by domain name" />
      <DatePicker
        date={start ? new Date(start) : new Date()}
        setDate={(value) =>
          value
            ? setStart(dayjs(value).startOf("day")?.toISOString())
            : setStart("")
        }
        className="w-[180px] h-12"
        postFix
      />
    </div>
  );
};

export default TopFilters;
