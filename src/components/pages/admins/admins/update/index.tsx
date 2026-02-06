"use client";
import { useGetAdminDetail } from "@/features/admins/services/queries";
import AdminUpdateForm from "../_components/AdminUpdateForm";
import { Loading } from "@/components/shared/loading";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";
import ErrorContainer from "@/components/shared/base/ErrorContainer";

const AdminUpdate = ({ id }: { id: string }) => {
  const adminDetail = useGetAdminDetail(id);
  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: "Admin Lists", href: "/admins/list" },
          { label: "Edit Admin", href: "#" },
        ]}
        enableBack
      />
      {adminDetail.isLoading ? (
        <Loading />
      ) : adminDetail.error ? (
        <ErrorContainer />
      ) : (
        adminDetail?.data?.body?.data && (
          <AdminUpdateForm data={adminDetail?.data?.body?.data} />
        )
      )}
    </div>
  );
};

export default AdminUpdate;
