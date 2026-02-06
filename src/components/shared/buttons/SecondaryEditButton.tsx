"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus, Edit, PencilLine, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { matchRouteToStoredPermission } from "@/utils/routeMatcher";
import { routePermissionMap } from "@/data/route-permissions";

//just ui, have to implement permission logic

interface CreateButtonProps {
  basePath?: string;
  asBtn?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  btnName?: string;
  className?: string;
  icon?: React.ReactNode;
}

const SecondaryEditButton: React.FC<CreateButtonProps> = ({
  basePath,
  asBtn = false,
  onClick = () => {},
  isLoading,
  btnName = "Edit All",
  className = "",
  icon = <PencilLine />,
}) => {
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);

  if (!match?.includes("EDIT")) return null;

  const button = (
    <Button
      onClick={asBtn ? onClick : undefined}
      className={cn(
        "text-sm !min-w-8 h-8 md:!min-w-[110px] md:h-11 bg-secondary border-primary text-primary",
        className
      )}
      size={"lg"}
      loading={isLoading}
      variant={"outline"}
    >
      {icon}
      <span className="hidden md:inline">{btnName}</span>
    </Button>
  );

  return asBtn ? (
    <div>{button}</div>
  ) : (
    <Link
      href={`${basePath}/create`}
      className="fixed bottom-4 right-6 z-50 md:static"
    >
      {button}
    </Link>
  );
};

export default SecondaryEditButton;
