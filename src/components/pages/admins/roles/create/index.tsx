'use client';
import { Form } from '@/components/ui/form';
import { CreateRoleRequest, createRoleSchema } from '@/features/admins/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import RoleForm from '../components/RoleForm';
import { useCreateRole } from '@/features/admins/services/mutations';
import { PageBreadcrumb } from '@/components/shared/base/bread-crumb';
import { permissionSchema } from '@/features/admins/types/permission.type';

const CreateRole = () => {
  const getDefaultPermissions = () => {
    const shape = permissionSchema.shape;
    const defaults: Record<string, string[] | []> = {};

    for (const key in shape) {
      defaults[key] = [];
    }

    return defaults;
  };

  const createRole = useCreateRole();

  const form = useForm<CreateRoleRequest>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: '',
      permissions: getDefaultPermissions(),
    },
  });

  const submit = async (data: CreateRoleRequest) => {
    createRole.mutateAsync(form.getValues());
  };

  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: 'Role & Permissions', href: '/admins.roles' },
          { label: 'Create Role', href: '#' },
        ]}
        enableBack
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <RoleForm form={form} mode={'create'} />
        </form>
      </Form>
    </div>
  );
};
export default CreateRole;
