import FirstTimeContainer from "@/components/shared/base/FirstTimeContainer";
import { Loading } from "@/components/shared/loading";
import PageTitle from "@/components/shared/PageTitle";
import { useGetFeatures } from "@/features/membership/features-user-agreement/services/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateFeature from "./CreateFeature";
import FeatureItem from "./FeatureItem";
import { Grid } from "@radix-ui/themes";
import CreateButton from "@/components/shared/buttons/CreateButton";

const Features = () => {
  const router = useRouter();
  const { data, isLoading } = useGetFeatures();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageTitle>
        {" "}
        Membership Features ({data?.body?.data.length} / 3){" "}
      </PageTitle>

      {isLoading ? (
        <Loading />
      ) : data?.body?.data.length == 0 ? (
        <FirstTimeContainer
          title="No membership features yet!"
          description="Click on the button below to start adding data."
          hideIcon
          onPress={() => setOpen(true)}
        />
      ) : (
        <div>
          <div className="pb-4">
            <CreateButton
              asBtn
              onClick={() => setOpen(true)}
              disabled={(data?.body?.data?.length ?? 0) >= 3}
            />
          </div>

          <Grid columns={"3"} className="gap-4">
            {data?.body?.data.map((item, key) => (
              <FeatureItem data={item} key={key} index={key + 1} />
            ))}
          </Grid>
        </div>
      )}
      {open && <CreateFeature open={open} handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default Features;
