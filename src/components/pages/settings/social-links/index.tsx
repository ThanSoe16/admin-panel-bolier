"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/shared/PageTitle";
import { Loading } from "@/components/shared/loading";
import {
  useGetSocialLinkIcons,
  useGetSocialLinks,
} from "@/features/socials/services/queries";
import { SocialLinksType } from "@/features/socials/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SelectIconsDialog } from "./components/SelectIconsDialog";
import { ChevronDown } from "lucide-react";
import { ConfirmStatusDialog } from "./components/ConfirmDialog";
import {
  useDragAndSortSocialLinks,
  useUpdateSocialLinks,
} from "@/features/socials/services/mutations";

type SocialLinkFormType = {
  links: {
    linkAddress: string;
    Status: "ACTIVE" | "INACTIVE";
    fileId?: string;
    name?: string;
    id: string;
  }[];
};

const ITEM_TYPE = "SOCIAL_LINK";

const DraggableRow = ({
  link,
  index,
  moveRow,
  isEditing,
  handleModalOpen,
  handleStatusChange,
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    canDrag: isEditing,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative w-full flex items-center gap-2 md:gap-3 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {/* Drag Icon (Only allows dragging when editing) */}
      <div
        ref={ref}
        className={`cursor-grab ${
          isEditing ? "opacity-100" : "opacity-50 cursor-not-allowed"
        }`}
      >
        <Image
          src="/components/drag.svg"
          alt="Drag"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </div>

      {/* Avatar */}
      <Avatar className="w-8 h-8 md:w-[50px] md:h-[50px]">
        <AvatarImage
          src={link.File.url}
          alt={link.name}
          className="w-8 h-8 md:w-[50px] md:h-[50px] object-cover"
        />
        <AvatarFallback>{link.name}</AvatarFallback>
      </Avatar>

      {/* Chevron */}
      <div
        className={
          isEditing ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }
        onClick={isEditing ? () => handleModalOpen(index) : undefined}
      >
        <ChevronDown className="w-4 h-4 md:w-6 md:h-6 text-default-secondary" />
      </div>

      {/* Link Address Input */}
      <FormField
        name={`links.${index}.linkAddress`}
        render={({ field }) => (
          <FormItem className="mt-0 w-full relative">
            <FormLabel className="text-xs md:text-sm absolute top-0 left-2 z-10 text-default-secondary bg-white">
              {isEditing ? "Paste link here*" : "Link*"}
            </FormLabel>
            <FormControl>
              <Input {...field} disabled={!isEditing} className="w-full h-14" />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Status Switch */}
      <FormField
        name={`links.${index}.Status`}
        render={({ field }) => (
          <FormItem className="mt-0">
            <FormControl>
              <Switch
                checked={field.value === "ACTIVE"}
                onCheckedChange={(checked) =>
                  handleStatusChange(index, checked)
                }
                disabled={!isEditing}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

const SocialLinks = () => {
  const { data: socialLinks, isLoading } = useGetSocialLinks();
  const { data: socialLinkIcons } = useGetSocialLinkIcons();
  const { mutateAsync: formUpdating, isPending: formSubmitting } =
    useUpdateSocialLinks();
  const { mutateAsync: dragHandler } = useDragAndSortSocialLinks();

  const [data, setData] = React.useState<SocialLinksType[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = React.useState<
    number | null
  >(null);
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
  const [pendingStatusChange, setPendingStatusChange] = React.useState<{
    index: number;
    newStatus: boolean;
  } | null>(null);

  const handleModalOpen = (index: number) => {
    setCurrentEditingIndex(index);
    setModalOpen(true);
  };

  const form = useForm<SocialLinkFormType>({ defaultValues: { links: [] } });

  React.useEffect(() => {
    if (socialLinks?.body?.data) {
      setData(socialLinks.body.data);
      form.reset({
        links: socialLinks.body.data.map((link) => ({
          linkAddress: link.linkAddress ?? "",
          Status: (link.Status ?? "INACTIVE") as "INACTIVE" | "ACTIVE",
          fileId: link.fileId ?? "",
          name: link.name ?? "",
          id: link.id,
        })),
      });
    }
  }, [socialLinks, form]);

  const handleIconSelect = (selectedLink) => {
    if (currentEditingIndex !== null) {
      // Update the data state
      const updatedData = [...data];
      updatedData[currentEditingIndex] = {
        ...updatedData[currentEditingIndex],
        fileId: selectedLink.id,
        File: {
          ...updatedData[currentEditingIndex].File,
          url: selectedLink.url,
          id: selectedLink.id,
        },
      };
      setData(updatedData);

      // Update the form values
      form.setValue(`links.${currentEditingIndex}.fileId`, selectedLink.id);
    }
  };

  const handleStatusChangeConfirm = () => {
    if (pendingStatusChange) {
      const { index, newStatus } = pendingStatusChange;
      form.setValue(`links.${index}.Status`, newStatus ? "ACTIVE" : "INACTIVE");
      setStatusDialogOpen(false);
      setPendingStatusChange(null);
    }
  };

  const moveRow = async (fromIndex, toIndex) => {
    if (!isEditing) return;

    const updatedData = [...data];
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);

    setData(updatedData);
    // Capture the two IDs that changed
    const changedIds = [updatedData[fromIndex].id, updatedData[toIndex].id];
    await dragHandler({ data: { id1: changedIds[0], id2: changedIds[1] } });
  };

  const onSubmit = async (formData) => {
    try {
      const response = await formUpdating({ links: formData });

      if (response.meta?.success) {
        toast.success(response?.meta?.message ?? "Successfully updated.");
        setIsEditing(false);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse.error?.data?.message ?? "");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.meta?.message ?? "Something went wrong"
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <PageTitle>Social Links (5 of 5)</PageTitle>
          {!isEditing && (
            <Button
              variant="default"
              className="rounded-[12px] bg-brand h-12"
              onClick={() => setIsEditing(true)}
            >
              <Image
                src="/components/edit.svg"
                alt="Edit"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Edit</span>
            </Button>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full space-y-4">
              {data?.map((link, index) => (
                <DraggableRow
                  key={link.id}
                  link={link}
                  index={index}
                  moveRow={moveRow}
                  isEditing={isEditing}
                  handleModalOpen={() => handleModalOpen(index)}
                  handleStatusChange={(index, newStatus) => {
                    setPendingStatusChange({ index, newStatus });
                    setStatusDialogOpen(true);
                  }}
                />
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center justify-end gap-3 mt-8">
                <Button
                  variant="outline"
                  className="text-text-primary h-14"
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-brand h-14"
                  addDoneIcon
                  disabled={formSubmitting}
                  type="submit"
                  loading={formSubmitting}
                >
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
      {socialLinkIcons && modalOpen && isEditing && (
        <SelectIconsDialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          availableLinks={
            Array.isArray(socialLinkIcons?.body?.data)
              ? socialLinkIcons?.body?.data ?? []
              : []
          }
          selectedLinks={data}
          onSelect={handleIconSelect}
        />
      )}
      {statusDialogOpen && isEditing && (
        <ConfirmStatusDialog
          open={statusDialogOpen}
          onClose={() => setStatusDialogOpen(false)}
          onConfirm={handleStatusChangeConfirm}
          newStatus={pendingStatusChange?.newStatus || false}
        />
      )}
    </DndProvider>
  );
};

export default SocialLinks;
