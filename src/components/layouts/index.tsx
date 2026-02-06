"use client";
import React, { ReactNode, useEffect } from "react";

import { ScrollArea } from "@radix-ui/themes";

import Header from "./Header";
import useNetworkStatus from "@/features/base/hooks/useNetworkStatus";
import NoInternet from "../pages/errors/NoInternet";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./side-bar/app-sidebar";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideSideBar?: boolean;
  title?: string;
  subTitle?: string;
}

export default function PageLayout(props: { children: ReactNode }) {
  const router = useRouter();
  const isOnline = useNetworkStatus();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   if (!storedToken) {
  //     router.replace("/login");
  //   }
  // }, []);

  if (!isOnline) {
    return <NoInternet />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        {/* Page Content */}
        <div className="max-h-screen h-[100dvh] flex flex-col w-full overflow-hidden">
          <NavHeader />
          <PageContainer>{props.children}</PageContainer>
        </div>
      </SidebarProvider>
    </div>
  );
}

function NavHeader() {
  return <Header />;
}
function PageContainer(props: { children: ReactNode }) {
  return (
    <ScrollArea className="h-[calc(100vh-130px)] flex-grow flex flex-col justify-center items-center bg-secondary p-4">
      <div className="p-4 pb-8 bg-background h-full rounded-lg">
        {props.children}
      </div>
    </ScrollArea>
  );
}
