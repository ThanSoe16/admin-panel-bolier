import DomainDetails from '@/components/pages/users/details/domain-detail';

interface Props {
  params: Promise<{ domainId: string; id: string }>;
}

const UserDomainDetailsPage = async ({ params }: Props) => {
  const { domainId, id } = await params;
  return <DomainDetails id={id} domainId={domainId} />;
};

export default UserDomainDetailsPage;
