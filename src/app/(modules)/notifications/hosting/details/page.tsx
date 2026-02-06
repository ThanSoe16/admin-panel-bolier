import HostingNotiDetails from "@/components/pages/notification/hosting/details";
import { NextPage } from "next";
import { Suspense } from "react";


const HostingNotiDetailsPage: NextPage = () => {
  return (
    <Suspense>
      <HostingNotiDetails />
    </Suspense>
  )
}

export default HostingNotiDetailsPage;