"use client";
import React from "react";
import { TemplatePagePreviewData } from "@/features/blog-templates/types";
import TableBaseButton from "@/components/shared/buttons/TableBaseButton";
import EditPReviewModel from "./EditPReviewModel";
import { useGetLandingLanguages } from "@/features/landing-languages/services/queries";

interface Props {
  target: TemplatePagePreviewData;
  remove: (index: number | number[]) => void;
  index: number;
  handleEdit: (data: TemplatePagePreviewData) => void;
}

const PreviewTableAction: React.FC<Props> = ({
  target,
  remove,
  index,
  handleEdit,
}) => {
  const { data: languages } = useGetLandingLanguages();
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-row gap-2">
      <TableBaseButton
        uiType="edit"
        type="button"
        onClick={() => setOpen(true)}
      >
        {" "}
        Edit{" "}
      </TableBaseButton>
      <TableBaseButton
        uiType="block"
        type="button"
        onClick={() => remove(index)}
      >
        {" "}
        Delete
      </TableBaseButton>

      {open && (
        <EditPReviewModel
          data={target}
          open={open}
          handleCancel={() => setOpen(false)}
          handleOk={(data) => {
            handleEdit(data);
            setOpen(false);
          }}
          landingLanguages={languages?.body?.data || []}
        />
      )}
    </div>
  );
};

export default PreviewTableAction;
