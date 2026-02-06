
import { NextPage } from "next";
import ShareTemplateSocials from "@/components/pages/settings/template-socials";
import { Suspense } from "react";

const ShareTemplateSocialsPage: NextPage = () => {
  return (
    <Suspense>
      <ShareTemplateSocials />

    </Suspense>
  )
}

export default ShareTemplateSocialsPage;