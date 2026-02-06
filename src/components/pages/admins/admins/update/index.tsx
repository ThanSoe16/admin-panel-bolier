'use client';
import { useGetAdminDetail } from '@/features/admins/services/queries';
import AdminUpdateForm from '../_components/AdminUpdateForm';
import { Loading } from '@/components/shared/base/loading';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import ErrorContainer from '@/components/shared/containers/error-container';

const AdminUpdate = ({ id }: { id: string }) => {
  const adminDetail = useGetAdminDetail(id);
  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: 'Admin Lists', href: '/admins/list' },
          { label: 'Edit Admin', href: '#' },
        ]}
        enableBack
      />
      {adminDetail.isLoading ? (
        <Loading />
      ) : adminDetail.error ? (
        <ErrorContainer />
      ) : (
        adminDetail?.data?.body?.data && <AdminUpdateForm data={adminDetail?.data?.body?.data} />
      )}
    </div>
  );
};

export default AdminUpdate;
