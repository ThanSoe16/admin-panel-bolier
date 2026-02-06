'use client';
import { PageBreadcrumb } from '@/components/shared/breadcrumb';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CreateAdminRequest, createAdminSchema } from '@/features/admins/types';
import { zodResolver } from '@hookform/resolvers/zod';
import AdminForm from '../_components/AdminForm';
import { useCreateAdmin } from '@/features/admins/services/mutations';
import { useRouter } from 'next/navigation';

const CreateAdmin = () => {
  const router = useRouter();
  const createAdmin = useCreateAdmin();
  const form = useForm<CreateAdminRequest>({
    resolver: zodResolver(createAdminSchema),
    mode: 'onChange',
  });

  const submit = async (data: CreateAdminRequest) => {
    createAdmin.mutateAsync(data).then((res) => router.back());
  };

  return (
    <div>
      <PageBreadcrumb
        links={[
          { label: 'Admins', href: '/admins/list' },
          { label: 'Create Admin', href: '#' },
        ]}
        enableBack
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <AdminForm form={form} mode={'create'} isLoading={createAdmin.isPending} />
        </form>
      </Form>
    </div>
  );
};
export default CreateAdmin;
