import TermsCard from "@/components/pages/settings/terms/_components/TermsCard";
import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import { Loading } from "@/components/shared/loading";
import PageTitle from "@/components/shared/PageTitle";
import { useGetBloglanguages } from "@/features/blog-preferences/services/queries";
import { useGetUserAgreement } from "@/features/membership/features-user-agreement/services/queries";
import { formatDate } from "@/utils/dateTime";
import { Grid } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const UserAgreement = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserAgreement();
  const languages = useGetBloglanguages();
  const english = languages?.data?.body?.data?.find((item) => item.key == "en");

  return (
    <div>
      <PageTitle> User Agreement </PageTitle>
      {isLoading ? (
        <Loading />
      ) : !data?.body?.data?.id ? (
        <FirstTimeContainer
          title="No user agreement yet!"
          description="Click on the button below to start adding data."
          hideIcon
          onPress={() =>
            router.push("/membership/feature-user-agreement/create")
          }
        />
      ) : (
        data?.body?.data && (
          <Grid columns={{ initial: "1" }} className="gap-4">
            <TermsCard
              flagSrc={english?.File?.url ?? ""}
              language={english?.name ?? ""}
              title={english?.name ?? ""}
              updatedOn={formatDate(data.body?.data?.updatedAt)}
              description={data.body?.data.content}
              onEdit={() =>
                router.push(
                  `/membership/feature-user-agreement/detail?language=${english?.key}`
                )
              }
            />
          </Grid>
        )
      )}
    </div>
  );
};

export default UserAgreement;
