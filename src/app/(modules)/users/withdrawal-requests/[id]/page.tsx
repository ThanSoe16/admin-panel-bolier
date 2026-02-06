import WithdrawalRequestDetail from "@/components/pages/users/withdrawal-requests/detail";

interface Props {
  params: Promise<{ id: string }>;
}

const WithdrawalRequestDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  return <WithdrawalRequestDetail id={id} />;
};

export default WithdrawalRequestDetailPage;
