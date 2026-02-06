import UpdateRole from '@/components/pages/admins/roles/update';

export default async function RoleUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <UpdateRole id={id} />;
}
