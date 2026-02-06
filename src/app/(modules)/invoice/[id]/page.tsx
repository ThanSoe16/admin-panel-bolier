import InvoiceDetails from "@/components/pages/invoice/details";

export default async function InvoiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceDetails id={id} />;
}
