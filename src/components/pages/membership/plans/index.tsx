"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import PageTitle from "@/components/shared/PageTitle";
import { usePagination } from "@/features/base/hooks/usePagination";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { useGetMembershipPlans } from "@/features/membership/plans/services/queries";
import { planColDefs } from "./_components/planColDefs";
import CreateMembership from "./_components/CreateMembership";

const MembershipPlans = () => {
  const { query } = usePagination();
  const { data, isLoading } = useGetMembershipPlans(query);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle> Membership Plans </PageTitle>
      <div className="table-container">
        <DataTable
          isShowNo={false}
          data={data?.body?.data ?? []}
          columns={planColDefs}
          total={data?.body?.total ?? 0}
          query={query}
          isLoading={isLoading}
          // getRowHighlight={(row) => row.Status === "INACTIVE"}
          renderHeader={() => (
            <div className="flex flex-row gap-0 md:gap-4 justify-start items-center">
              <CreateButton asBtn onClick={() => setOpen(true)} />
            </div>
          )}
        />
      </div>
      {open && (
        <CreateMembership handleClose={() => setOpen(false)} open={open} />
      )}
    </div>
  );
};

export default MembershipPlans;
