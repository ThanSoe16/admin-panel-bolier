import WithdrawalFeeHistory from "@/components/pages/payment-settings/withdrawal-fee/history";

export default async function BlogServiceFeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WithdrawalFeeHistory id={id} />;
}
