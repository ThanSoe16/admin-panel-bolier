import {
  AdminData,
  UpdateAdminRequest,
  updateAdminSchema,
} from "@/features/admins/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AdminForm from "./AdminForm";
import { useUpdateAdmin } from "@/features/admins/services/mutations";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { passwordDecrypt } from "@/utils/passwordDescrypt";

const AdminUpdateForm = ({ data }: { data: AdminData }) => {
  const router = useRouter();
  const updateAdmin = useUpdateAdmin();
  const defaultValues = {
    ...data,
    profileUrl: data.Avatar?.url,
    password: passwordDecrypt(
      data?.encryptedPassword ?? "",
      data?.iv ?? "",
      data?.key ?? ""
    ),
  };
  const form = useForm<UpdateAdminRequest>({
    resolver: zodResolver(updateAdminSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const submit = async (data: UpdateAdminRequest) => {
    updateAdmin.mutateAsync(data).then((res) => router.back());
    // createAdmin.mutateAsync(data).then((res) => router.back());
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <AdminForm
            form={form}
            mode={"update"}
            isLoading={updateAdmin.isPending}
          />
        </form>
      </Form>
    </div>
  );
};
export default AdminUpdateForm;
