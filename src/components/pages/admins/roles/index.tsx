'use client';
import { DataTable } from '@/components/shared/data-table';
import { Loading } from '@/components/shared/loading';
import { useGetRoles } from '@/features/admins/services/queries';
import { usePagination } from '@/features/base/hooks/usePagination';
import { roleColDefs } from './components/RoleColDefs';
import SearchInput from '@/components/shared/search-input';
import { Box, Flex } from '@radix-ui/themes';
import CreateButton from '@/components/shared/buttons/CreateButton';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';

const Roles = () => {
  const { query } = usePagination();
  const roles = useGetRoles(query || '');

  return (
    <div className="space-y-4">
      <PageBreadcrumb links={[{ label: 'Role & Permissions', href: '#' }]} />
      <Box className="table-container">
        <DataTable
          columns={roleColDefs}
          data={roles.data?.body?.data ?? []}
          query={query}
          total={roles.data?.body?.total ?? 0}
          isLoading={roles.isLoading}
          renderHeader={() => (
            <Flex align="center" className="space-x-2">
              <CreateButton basePath="/admins/roles" />
              <SearchInput placeholder="Search by role name" />
            </Flex>
          )}
          isShowNo={false}
        />
      </Box>
    </div>
  );
};
export default Roles;
