import MaintainNotiDetails from "@/components/pages/notification/maintain/details";
import { NextPage } from "next";
import { Suspense } from "react";


const MaintainNotiDetailsPage: NextPage = () => {
  return (
    <Suspense>
      <MaintainNotiDetails />
    </Suspense>
  )
}

export default MaintainNotiDetailsPage;