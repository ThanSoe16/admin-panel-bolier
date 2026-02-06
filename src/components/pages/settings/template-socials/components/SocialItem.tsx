"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import StatusChangeDialog from "@/components/shared/status-change-dialog";
import { TemplateSocialStatusEnum } from "@/features/base/types/backend-defined-enums";
import { useUpdateTemplateSocialStatus } from "@/features/settings/template-socials/services/mutations";
import { toast } from "sonner";

interface SocialItemProps {
  name: string;
  icon: string;
  status: string;
  id: string;
}

const SocialItem: React.FC<SocialItemProps> = ({ name, icon, status, id }) => {
  const { mutateAsync, isPending } = useUpdateTemplateSocialStatus();
  const [open, setOpen] = React.useState(false);
  const description =
    status === "ACTIVE"
      ? "Are you sure you want to turn off to share One Site templates on this social media platform?"
      : "Are you sure you want to turn on to share One Site templates on this social media platform?";

  const handleStatusChange = async () => {
    try {
      const response = await mutateAsync({
        data: {
          Status:
            status === TemplateSocialStatusEnum.ACTIVE
              ? TemplateSocialStatusEnum.INACTIVE
              : TemplateSocialStatusEnum.ACTIVE,
        },
        id: id,
      });
      if (response?.meta?.success) {
        toast.success(response?.meta?.message);
        setOpen(false);
      } else {
        toast.error(response?.meta?.message);
      }
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-start w-full gap-2 text-sm">
      <Switch
        id={name}
        checked={status === TemplateSocialStatusEnum.ACTIVE}
        onCheckedChange={() => setOpen(true)}
        className="mr-0 h-6"
      />
      <p className="mr-6">
        {" "}
        {status === TemplateSocialStatusEnum.ACTIVE ? "On" : "Off"}{" "}
      </p>

      <Image
        src={icon}
        alt={name}
        width={80}
        height={80}
        className="rounded-full w-10 h-10 object-cover mr-2"
      />

      <p> {name} </p>

      {open && (
        <StatusChangeDialog
          open={open}
          isActive={status === TemplateSocialStatusEnum.ACTIVE}
          handleClose={() => setOpen(false)}
          handleChange={handleStatusChange}
          description={description}
          loading={isPending}
        />
      )}
    </div>
  );
};

export default SocialItem;
