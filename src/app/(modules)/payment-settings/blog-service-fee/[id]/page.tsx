import InvoiceDetails from "@/components/pages/invoice/details";
import BlogServiceFeeHistory from "@/components/pages/payment-settings/blog-service-fee/history";

export default async function BlogServiceFeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogServiceFeeHistory id={id} />;
}
