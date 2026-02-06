'use client';
import { Loading } from '@/components/shared/base/loading';
import { useGetRoleDetail } from '@/features/admins/services/queries';
import UpdateRoleForm from '../components/UpdateRoleForm';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';

const RoleDetail = ({ id }: { id: string }) => {
  const roleDetail = useGetRoleDetail(id);
  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: 'Role & Permissions', href: '/admins.roles' },
          { label: 'View Role', href: '#' },
        ]}
        enableBack
      />
      {roleDetail.isLoading ? (
        <Loading />
      ) : (
        roleDetail.data?.body?.data && (
          <UpdateRoleForm data={roleDetail.data?.body?.data} mode="view" />
        )
      )}
    </div>
  );
};
export default RoleDetail;
