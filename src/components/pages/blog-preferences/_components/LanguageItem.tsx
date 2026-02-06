"use client";
import EditButton from "@/components/shared/buttons/EditButton";
import { Image } from "@/components/ui/image";
import { useUpdateBlogLanguageStatus } from "@/features/blog-preferences/services/mutations";
import { BlogLanguageData } from "@/features/blog-preferences/types";
import { useSortable } from "@dnd-kit/sortable";
import { Menu } from "lucide-react";
import { useState } from "react";
import { EditLanguageDialog } from "./EditLanguageDialog";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import StatusSwitch from "@/components/shared/buttons/StatusSwitch";

const LangageItem = ({
  index,
  data,
  disabled,
}: {
  index: number;
  data: BlogLanguageData;
  disabled?: boolean;
}) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: data.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [openEditModal, setOpenEditModal] = useState(false);

  const changeStatus = useUpdateBlogLanguageStatus();

  const handleStatusToggle = async () => {
    changeStatus.mutateAsync(data?.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        disabled ? "cursor-not-allowed" : "",
        "relative w-full flex items-center gap-2 md:gap-3  py-4 border-b mt-0"
      )}
    >
      {/* Drag Icon (Only allows dragging when editing) */}
      <div className="flex items-center gap-4 flex-1">
        <button
          {...attributes}
          {...listeners}
          className={cn(
            disabled ? "cursor-not-allowed opacity-50" : "cursor-move",
            "flex items-center justify-center"
          )}
          disabled={disabled}
        >
          <Menu />
          <div className="pl-2">{index}</div>
        </button>
        {!data.isDefault && (
          <StatusSwitch
            value={data.Status === "ACTIVE"}
            onChange={handleStatusToggle}
            activeLabel=" "
            inactiveLabel=" "
            activeDesc={`Are you sure you want to set this language to 'On'?  Once turned on, it will become visible to users.`}
            inactiveDesc={`Are you sure you want to set this language to 'Off'? Once turned off, this language will no longer be visible to users.`}
          />
        )}

        <div
          className={cn(
            // disabled ? "opacity-50" : "",
            "flex items-center gap-2"
          )}
        >
          <Image
            src={data?.File?.url}
            alt={data?.File?.name}
            width={24}
            height={24}
            className="rounded-full w-6 h-6"
          />
          <span className="font-medium">{data.name}</span>
          {data.isDefault && (
            <span className="text-xs font-semibold bg-brand-secondary text-brand border border-stroke-secondary px-2 py-1 rounded">
              Default
            </span>
          )}
        </div>
      </div>

      {!data.isDefault && (
        <EditButton asBtn onClick={() => setOpenEditModal(true)} />
      )}

      {openEditModal && (
        <EditLanguageDialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          data={data}
        />
      )}
    </div>
  );
};

export default LangageItem;
