import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";
import { Image } from "@/components/ui/image";
import { FeatureData } from "@/features/membership/features-user-agreement/types";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import EditFeature from "./EditFeature";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import ConfirmationDialog from "@/components/shared/dialog/confirmation-dialog";
import { useDeleteFeature } from "@/features/membership/features-user-agreement/services/mutations";

const FeatureItem = ({ data, index }: { data: FeatureData; index: number }) => {
  const deleteFeature = useDeleteFeature();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <div className="border p-6 rounded-xl">
      <Flex justify={"between"}>
        <div className="w-5" />
        <Image
          src={data?.File?.url ?? ""}
          alt=""
          width={1000}
          height={1000}
          className="w-32 h-32 rounded-xl"
        />
        <DeleteButton asBtn onClick={() => setDeleteOpen(true)} />
      </Flex>
      <div className="flex gap-2 pt-4">
        <p className="text-primary text-base font-bold">{index}.</p>
        <p className="font-semibold">{data.title}</p>
      </div>
      <p className="line-clamp-2 text-sm pt-2">{data.description}</p>
      <div className="w-full pt-4">
        <SecondaryEditButton
          asBtn
          onClick={() => setEditOpen(true)}
          isLoading={false}
          btnName="Edit All"
          className="w-full"
        />
      </div>
      {editOpen && (
        <EditFeature
          data={data}
          handleClose={() => setEditOpen(false)}
          open={editOpen}
        />
      )}
      {deleteOpen && (
        <ConfirmationDialog
          title="Are You Sure"
          desc="Are you sure you want to delete this image preview? This action cannot be undone."
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          isDelete
          confirmText={"Delete"}
          enableDeleteIcon
          isLoading={deleteFeature.isPending}
          onPress={() =>
            deleteFeature
              .mutateAsync(data.id)
              .then((res) => setDeleteOpen(false))
          }
        />
      )}
    </div>
  );
};
export default FeatureItem;
