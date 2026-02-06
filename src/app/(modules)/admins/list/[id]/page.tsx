import AdminDetail from '@/components/pages/admins/admins/detail';

export default async function AdminDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminDetail id={id} />;
}
