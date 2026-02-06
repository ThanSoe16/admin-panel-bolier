import { useUpdateRole } from '@/features/admins/services/mutations';
import { RoleData, UpdateRoleRequest, updateRoleSchema } from '@/features/admins/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import RoleForm from './RoleForm';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const UpdateRoleForm = ({
  data,
  mode = 'update',
}: {
  data: RoleData;
  mode?: 'update' | 'view';
}) => {
  const router = useRouter();
  const updateRole = useUpdateRole();

  const form = useForm<UpdateRoleRequest>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: data,
  });

  const submit = async (data: UpdateRoleRequest) => {
    updateRole.mutateAsync(form.getValues()).then(() => {
      router.back();
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          {data && <RoleForm form={form} mode={mode} />}
        </form>
      </Form>
    </div>
  );
};
export default UpdateRoleForm;
