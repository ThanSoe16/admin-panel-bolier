import ServerNotiDetails from "@/components/pages/notification/server/details";
import { NextPage } from "next";
import { Suspense } from "react";


const ServerNotiDetailsPage: NextPage = () => {
  return (
    <Suspense>
      <ServerNotiDetails />
    </Suspense>
  )
}

export default ServerNotiDetailsPage;