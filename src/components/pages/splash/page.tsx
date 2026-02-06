"use client";

import { Loading } from "@/components/shared/loading";
import { routePermissionMap } from "@/data/route-permissions";
import { matchFirstStoredPermission } from "@/utils/routeMatcher";

import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Splash: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const match = matchFirstStoredPermission(routePermissionMap); // Make sure this returns { path: string }
      if (match) {
        router.push(match.path);
      } else {
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <Flex
      direction="column"
      className="h-screen w-screen bg-splash-bg space-y-6 bg-center bg-no-repeat bg-cover"
      justify="center"
      align="center"
    >
      <Loading className="text-white mt-36" />
    </Flex>
  );
};

export default Splash;
