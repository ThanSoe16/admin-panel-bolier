import PageLayout from "@/components/layouts";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default Layout;
