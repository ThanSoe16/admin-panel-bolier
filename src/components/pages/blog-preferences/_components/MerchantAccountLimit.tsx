"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useGetBlogMerchantAccountLimit } from "@/features/blog-preferences/services/queries";
import EditMerchantAccountLimitModal from "./EditMerchantAccountLimitModal";
import SecondaryEditButton from "@/components/shared/buttons/SecondaryEditButton";

const MerchantAccountLimit = () => {
  const { data } = useGetBlogMerchantAccountLimit();
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="w-full p-4  border rounded-2xl">
      <h2 className="text-sm md:text-base lg:text-lg font-bold mb-4">
        Merchant Account Limit
      </h2>
      <div className="flex flex-row gap-2 justify-start items-center w-full">
        <div className="flex-1">
          <Input
            type="number"
            value={data?.body?.data?.numberOfMerchant}
            readOnly
            className=" w-full"
          />
        </div>
        <SecondaryEditButton
          asBtn
          onClick={() => setOpenEditModal(true)}
          btnName="Edit"
        />
      </div>

      {openEditModal && data?.body?.data && (
        <EditMerchantAccountLimitModal
          data={data?.body?.data}
          open={openEditModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default MerchantAccountLimit;
