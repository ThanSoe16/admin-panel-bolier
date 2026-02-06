import UserDetails from "@/components/pages/users/details";

interface Props {
  params: Promise<{ id: string }>;
}

const UserDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  return <UserDetails id={id} />;
};

export default UserDetailsPage;
