import AdminUpdate from "@/components/pages/admins/admins/update";

export default async function AdminUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminUpdate id={id} />;
}
