"use client";
import { DataTable } from "@/components/shared/data-table";
import { useGetAdmins, useGetRoles } from "@/features/admins/services/queries";
import { usePagination } from "@/features/base/hooks/usePagination";
import SearchInput from "@/components/shared/search-input";
import { Box, Flex } from "@radix-ui/themes";
import CreateButton from "@/components/shared/buttons/CreateButton";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import { adminColDefs } from "./_components/AdminColDefs";
import SelectBoxFilter from "@/components/shared/base/SelectBoxFilter";
import { useQueryState } from "nuqs";

const Admins = () => {
  const { query } = usePagination();
  const [role] = useQueryState("role");

  const admins = useGetAdmins({
    word: query.word,
    pageIndex: query.pageIndex,
    rowPerPage: query.rowPerPage,
    adminRoleId: role == "all" ? "" : role ?? "",
  });
  const roles = useGetRoles(query);

  const roleStatus = [
    { label: "All Roles", value: "all" },
    ...(roles.data?.body?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) ?? []),
  ];

  return (
    <div className="space-y-4">
      <PageBreadcrumb links={[{ label: "Admin Lists", href: "#" }]} />
      <Box className="table-container">
        <DataTable
          columns={adminColDefs}
          data={admins.data?.body?.data ?? []}
          query={query}
          total={admins.data?.body?.total}
          isLoading={admins.isLoading}
          renderHeader={() => (
            <div className="w-full flex flex-col md:flex-row flex-grow gap-2">
              <Flex align="center" className="gap-2">
                <CreateButton basePath="/admins/list" />
                <SearchInput placeholder="Search by admin name" />
              </Flex>
              <div className="w-[200px]">
                {roleStatus && (
                  <SelectBoxFilter arr={roleStatus} selectParam="role" />
                )}
              </div>
            </div>
          )}
          isShowNo={false}
        />
      </Box>
    </div>
  );
};
export default Admins;
