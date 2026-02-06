import WithdrawalHistoryDetail from "@/components/pages/users/withdrawal-history/details";

interface Props {
  params: Promise<{ id: string }>;
}

const WithdrawalHistoryDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return <WithdrawalHistoryDetail id={id} />;
};

export default WithdrawalHistoryDetailPage;
