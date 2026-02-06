"use client";
import dayjs from "dayjs";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useMemo } from "react";
export const usePagination = () => {
  const [pagination, setPagination] = useQueryState(
    "pagination",
    parseAsBoolean.withDefault(true)
  );

  const [word, setWord] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
  const [pageIndex, setPageIndex] = useQueryState(
    "pageIndex",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true })
  );
  const [rowPerPage, setRowPerPage] = useQueryState(
    "rowPerPage",
    parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true })
  );
  const [uuid, setUUID] = useQueryState(
    "uuid",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("all").withOptions({ clearOnDefault: true })
  );
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsString.withDefault("en").withOptions({ clearOnDefault: true })
  );
  const [date, setDate] = useQueryState(
    "date",
    parseAsString
      .withDefault(dayjs().format("YYYY-MM-DD"))
      .withOptions({ clearOnDefault: true })
  );
  const [start, setStarting] = useQueryState("start");
  const [end, setEnding] = useQueryState("end");
  const [mode, setMode] = useQueryState(
    "mode",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  const handleSearchChange = (value: string | null) => {
    if (value === null) {
      return;
    }
    setWord(value);
    setPageIndex(1); // Reset to first page when search changes
  };

  const setStart = (value: string | null) => {
    setStarting(value);
    setPageIndex(1);
  };

  const setEnd = (value: string | null) => {
    setEnding(value);
    setPageIndex(1);
  };

  const query = useMemo(() => {
    return {
      word,
      pageIndex,
      rowPerPage,
      pagination,
    };
  }, [word, pageIndex, rowPerPage, pagination]);

  return {
    word,
    setWord,
    pagination,
    setPagination,
    pageIndex,
    setPageIndex,
    rowPerPage,
    setRowPerPage,
    query,
    uuid,
    setUUID,
    status,
    setStatus,
    language,
    setLanguage,
    mode,
    setMode,
    date,
    setDate,
    tab,
    setTab,
    start,
    setStart,
    end,
    setEnd,
    handleSearchChange,
  };
};
