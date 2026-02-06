"use client";
import React from "react";
import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import TableBaseButton from "./TableBaseButton";
import { usePathname } from "next/navigation";
import { matchRouteToStoredPermission } from "@/utils/routeMatcher";
import { routePermissionMap } from "@/data/route-permissions";
import { Trash2 } from "lucide-react";

//just ui, have to implement permission logic

interface EditButtonProps extends ButtonProps {
  basePath?: string;
  asBtn?: boolean;
  onClick?: () => void;
}

const DeleteButton: React.FC<EditButtonProps> = ({
  basePath,
  asBtn = false,
  onClick = () => {},
}) => {
  const pathname = usePathname();
  const match = matchRouteToStoredPermission(pathname, routePermissionMap);
  if (!match.includes("DELETE")) return <div className="w-6" />;

  const button = (
    <Button variant={"ghost"} onClick={onClick} className="p-0">
      <Trash2 className="text-red-500 min-w-6 min-h-6" />
    </Button>
  );

  return asBtn ? (
    <div>{button}</div>
  ) : (
    <Link href={`${basePath}/update`} className="">
      {button}
    </Link>
  );
};

export default DeleteButton;
