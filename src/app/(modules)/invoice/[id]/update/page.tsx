import UpdateInvoice from "@/components/pages/invoice/edit";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UpdateInvoice id={id} />;
}
