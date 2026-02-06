import RoleDetail from '@/components/pages/admins/roles/detail';

export default async function RoleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RoleDetail id={id} />;
}
