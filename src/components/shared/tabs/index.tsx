"use client";
import React from "react";
import { usePagination } from "@/features/base/hooks/usePagination";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface Props {
  tabList: {
    tab: string | string[];
    // search param for tab must be 'tab' like '/users?tab=domains'
    // default tab can be tab less ie /user
    label: string;
    includeSearchParam?: string[];
  }[];
  className?: string;
  secondaryUI?: boolean;
  defaultValue?: string;
}

const Tabs: React.FC<Props> = ({
  tabList,
  className = "",
  secondaryUI = false,
  defaultValue,
}) => {
  const { tab, setTab, setDate, setPageIndex } = usePagination();
  React.useEffect(() => {
    if (!tab) {
      if (defaultValue) {
        setTab(defaultValue);
      } else if (tabList.length > 0) {
        const firstTab = tabList[0]?.tab;
        setTab(Array.isArray(firstTab) ? firstTab[0] : firstTab);
      }
    }
  }, [tab, defaultValue, tabList, setTab]);

  return (
    <div className={cn("flex flex-row flex-wrap gap-2", className)}>
      {tabList.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              const firstTab = item.tab;
              setTab(Array.isArray(firstTab) ? firstTab[0] : firstTab);
              setDate(dayjs().startOf("day").format("YYYY-MM-DD"));
              setPageIndex(1);
            }}
            className={cn(
              "py-3 px-4 rounded-xl text-sm cursor-pointer",
              secondaryUI
                ? cn(
                    (
                      Array.isArray(item.tab)
                        ? item.tab.includes(tab)
                        : item.tab === tab
                    )
                      ? " border-brand text-brand font-bold border-b-[3px] rounded-none "
                      : "text-default-secondary",
                    "bg-transparent rounded-none"
                  )
                : (
                    Array.isArray(item.tab)
                      ? item.tab.includes(tab)
                      : item.tab === tab
                  )
                ? "bg-brand-secondary text-brand border border-stroke-secondary font-bold"
                : "bg-[#F7F7F7] text-default-secondary"
            )}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
