"use client";
import { Loading } from "@/components/shared/loading";
import { useGetRoleDetail } from "@/features/admins/services/queries";
import UpdateRoleForm from "../components/UpdateRoleForm";
import { PageBreadcrumb } from "@/components/shared/breadcrumb";

const UpdateRole = ({ id }: { id: string }) => {
  const roleDetail = useGetRoleDetail(id);
  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: "Role & Permissions", href: "/admins.roles" },
          { label: "Edit Role", href: "#" },
        ]}
        enableBack
      />
      {roleDetail.isLoading ? (
        <Loading />
      ) : (
        roleDetail.data?.body?.data && (
          <UpdateRoleForm data={roleDetail.data?.body?.data} mode="update" />
        )
      )}
    </div>
  );
};
export default UpdateRole;
