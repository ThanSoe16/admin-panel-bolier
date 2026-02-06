"use client";
import React from "react";
import { ContactUsFormsType } from "@/features/contact-us-forms/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import dayjs from "dayjs";

const DetailsDialog = (props: {
  open: boolean;
  handleClose: () => void;
  data: ContactUsFormsType;
}) => {
  return (
    <Dialog open={props?.open} onOpenChange={props?.handleClose}>
      <DialogContent>
        <DialogTitle> Contact Us Form Details </DialogTitle>
        <div className="flex flex-col justify-between items-center gap-4 text-default-secondary text-sm md:text-base text-left w-full">
          <div className=" w-full flex flex-row align-center">
            <p className="flex-1"> Contacted on : </p>
            <p className="flex-1 text-default text-sm">
              {" "}
              {dayjs(props?.data?.createdAt).format("DD MMM YYYY, HH:mm")}{" "}
            </p>
          </div>
          <div className=" w-full flex flex-row align-center">
            <p className="flex-1"> Name : </p>
            <p className="flex-1 text-default text-sm"> {props?.data?.name} </p>
          </div>
          <div className=" w-full flex flex-row align-center">
            <p className="flex-1"> Email : </p>
            <p className="flex-1 text-default text-sm">
              {" "}
              {props?.data?.email}{" "}
            </p>
          </div>
          <div className=" w-full flex flex-col">
            <p className="flex-1"> Message : </p>
            <p className="flex-1 text-default text-sm pt-1">
              {" "}
              {props?.data?.message}{" "}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
